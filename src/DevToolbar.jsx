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
    this.socket = io(`http://localhost:${this.props.port || 3001}`);
    this.socket.on('devUpdate', update => this.updateDetails(update));
    fetch('/'); // trigger the socket to send
  }

  getDevPieces() {
    if (Object.keys(this.state).length === 0) {
      return (<button styles={styles.piece} onClick={() => fetch('/')}>Load initial data</button>);
    }
    return Object.entries(this.state).map(([key, value], i) =>
      <div key={i} styles={styles.piece}>
        <span key={1} styles={styles.key}>{key}: </span>
        <span key={2} styles={styles.value}>{getValue(value)}</span>
      </div>
    );
  }

  updateDetails(update) {
    this.setState(update);
  }

  render() {
    return (
      <div styles={styles.toolbar}>
        <div styles={styles.before} />
        {this.getDevPieces()}
        <div styles={styles.after} />
      </div>
    );
  }
}

Developer.propTypes = {
  devDetails: PropTypes.object, // eslint-disable-line
  port: PropTypes.number,
};
