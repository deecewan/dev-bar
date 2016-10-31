import fs from 'fs';
import path from 'path';
import Socket from 'socket.io';
import onHeaders from 'on-headers';
import onFinished from 'on-finished';
import chalk from 'chalk';

const io = new Socket(process.env.SOCKET_PORT || 3001, { serveClient: false });

io.on('connection', () => {
  console.log('received connection from dev client');
});

function asyncFileRead(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

/* eslint-disable no-underscore-dangle, no-param-reassign */
export default function devMode(devDetails) {
  return (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
      return next();
    }
    req.devStarted = process.hrtime();
    const developerDetails = { };
    onHeaders(res, function setResHeadersThing() {
      if (!req.devStarted) {
        return;
      }
      this.devStarted = process.hrtime();
      const ms = ((this.devStarted[0] - req.devStarted[0]) * 1e3) +
        ((this.devStarted[1] - req._startAt[1]) * 1e-6);
      developerDetails.req = ms.toFixed(3);
    });
    onFinished(res, async () => {
      if (res.devStarted) {
        const t = process.hrtime();
        const ms = ((t[0] - res.devStarted[0]) * 1e3) +
          ((t[1] - res.devStarted[1]) * 1e-6);
        developerDetails.res = ms.toFixed(3);
        console.log('dev details was', developerDetails);
      }
      try {
        const branchName = await asyncFileRead(path.resolve('.git', 'HEAD'));
        developerDetails.branch = branchName.toString().replace('ref: refs/heads/', '').trim();
      } catch (e) {
        console.warn("Couldn't open git ref head", e);
      }
      developerDetails.userId = null;
      if (req.user) {
        developerDetails.userId = req.user.id;
      }

      io.emit('devUpdate', developerDetails);
    });

    if (devDetails && typeof devDetails !== 'object') {
      console.warn(chalk.orange.bold('devDetails should be an object'));
    }
    const d = devDetails || {};
    Object.entries(d).forEach(([key, value]) => {
      const v = typeof value === 'function' ? value(req, res) : value;
      developerDetails[key] = v;
    });

    /* eslint-enable */
    return next();
  };
}
