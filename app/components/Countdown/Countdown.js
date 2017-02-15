import React, {Component} from 'react';

import styles from './Countdown.css';

export default class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: this.props.minutes
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      minutes: this.state.minutes < 1
        ? 0
        : (this.state.minutes - 1)
    });
  }

  renderMinutes(minutes) {
    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    return `${h}:${(m < 10 ? '0' : '') + m}`;
  }

  render() {
    return (
      <div className={styles.etd}>{this.renderMinutes(this.state.minutes)}</div>
    );
  }
}
