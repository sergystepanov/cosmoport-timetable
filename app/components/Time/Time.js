// @flow
import React, {Component} from 'react';

export default class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showColon: true,
      date: new Date()
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
      date: new Date(),
      showColon: !this.state.showColon
    });
  }

  format00(value) {
    return value < 10
      ? value = `0${value}`
      : value;
  }

  showHide() {
    return {
      opacity: this.state.showColon
        ? '.999'
        : '0'
    };
  }

  date(part) {
    return 'h' === part
      ? this
        .state
        .date
        .getHours()
      : 'm' === part
        ? this
          .state
          .date
          .getMinutes()
        : '';
  }

  renderTime() {
    return (
      <div className="time__number">
        <span>{this.date('h')}</span>
        <span style={this.showHide()}>:</span>
        <span>{this.format00(this.date('m'))}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="time">
        <div className="time__img">
          <i className="i-clock time__icon"></i>
        </div>
        <div className="time__body">
          {this.renderTime()}
        </div>
      </div>
    );
  }
}
