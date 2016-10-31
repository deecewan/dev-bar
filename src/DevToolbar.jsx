import React, { PureComponent, PropTypes } from 'react';
import io from 'socket.io-client/socket.io';

import styles from './styles';

function getValue(value) {
  if (value == null) {
    return 'undefined';
  }
  if (value.toString) {
    return value.toString();
  }
  return value;
}

export default class Developer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    let url = `http://localhost:${this.props.port || 3001}`;
    if (props.url) {
      url = props.url;
    }
    this.socket = io(url);
    this.socket.on('devUpdate', update => this.updateDetails(update));
    fetch('/'); // trigger the socket to send
  }

  getDevPieces() {
    if (Object.keys(this.state).length === 0) {
      return (<button style={styles.piece} onClick={() => fetch('/')}>Load initial data</button>);
    }
    return Object.entries(this.state).map(([key, value], i) =>
      <div key={i} style={styles.piece}>
        <span key={1} style={styles.key}>{key}: </span>
        <span key={2} style={styles.value}>{getValue(value)}</span>
      </div>
    );
  }

  updateDetails(update) {
    this.setState(update);
  }

  render() {
    return (
      <div style={styles.toolbar}>
        <div style={styles.before} />
        {this.getDevPieces()}
        <div style={styles.after} />
      </div>
    );
  }
}

Developer.propTypes = {
  devDetails: PropTypes.object, // eslint-disable-line
  port: PropTypes.number,
  url: PropTypes.string,
};
