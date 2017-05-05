import React, { Component, PropTypes } from 'react';
import FadeProps from 'fade-props';

export default class CalendarDate extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      ui_months_names: PropTypes.shape({
        id: PropTypes.number,
        values: PropTypes.arrayOf(PropTypes.string)
      })
    })
  }

  static defaultProps = {
    locale: {}
  }

  constructor(props) {
    super(props);

    this.state = {
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
    this.setState({ date: new Date() });
  }

  renderMonthDay() {
    return this.state.date.getDate();
  }

  renderMonthName() {
    return this.props.locale.ui_months_names !== undefined
      ? this.props.locale.ui_months_names.values[this.state.date.getMonth()]
      : this.state.date.getMonth();
  }

  renderYear() {
    return this.state.date.getFullYear();
  }

  render() {
    const monthName = this.renderMonthName();

    return (
      <div className="date" >
        <div className="date__img">
          <i className="i-calendar date__icon" />
        </div>
        <div className="date__body">
          <div className="date__number">{this.renderMonthDay()}</div>
          <div className="date__number">
            <FadeProps animationLength={450}>
              <span key={monthName}>
                {monthName}
              </span>
            </FadeProps>
          </div>
          <div className="date__number">{this.renderYear()}</div>
        </div>
      </div >
    );
  }
}
