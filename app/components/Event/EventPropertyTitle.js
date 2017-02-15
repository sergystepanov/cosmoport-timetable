// @flow
import React, {Component} from 'react';
import styles from './EventPropertyTitle.css';

export default class EventPropertyTitle extends Component {
  render() {
    return (
      <div className={styles.block}>
        <div>{this.props.value}</div>
      </div>
    );
  }
}
