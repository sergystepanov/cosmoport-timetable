import React, { Component } from 'react';

import Trapeze from './Trapeze';
import Locale from '../class/Locale';
import FadeProps from '../class/Fade';
import _Date from '../class/_Date';

const isEnded = (date, minutes) => {
  const waitPeriod = 10;

  return minutes <= waitPeriod + date.getHours() * 60 + date.getMinutes();
};

export default class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = { fade: true, fadeTime: 500 };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // Changes fade in/out state on each locale change
    if (this.props.locale !== newProps.locale) {
      this.setState({ fade: !this.state.fade });
    }
  }

  getLocaleProp(prop) {
    return Locale.getLocaleProp(prop, this.props.locale);
  }

  mapStatus = (statusId, date, minutes) => {
    const map = {
      1: 'cancel',
      2: 'landing',
      4: 'finish',
      5: 'finish',
      6: 'pre-order',
    };
    const ended = isEnded(date, minutes);

    return ended
      ? ' voyage--finish'
      : map[statusId]
      ? ' voyage--' + map[statusId]
      : '';
  };

  renderIcon = (typeId) => (
    <FadeProps animationLength={500}>
      <i
        key={this.state.fade}
        className={`i-${{ 1: 'man', 2: 'radar' }[typeId] || 'space-small'}`}
      ></i>
    </FadeProps>
  );

  renderDepartion = (minutes) => this.fade(_Date.minutesToHm(minutes));

  renderTypeTitle(val, values) {
    let result = val;

    for (const type of values.types) {
      if (val === type.id) {
        result = this.renderPropAnimated(type.i18nEventTypeName, ':');
        break;
      }
    }

    return result;
  }

  renderTypeName(val, values) {
    let result = val;

    for (const type of values.types) {
      if (val === type.id) {
        result = this.renderPropAnimated(type.i18nEventTypeSubname);
        break;
      }
    }

    return result;
  }

  renderDestination(val, values) {
    let result = val;

    for (const dest of values.destinations) {
      if (val === dest.id) {
        result = this.renderPropAnimated(dest.i18nEventDestinationName);
        break;
      }
    }

    return result;
  }

  renderDuration = (m) =>
    this.fade(
      `${_Date.fullHours(m)} ${this.getLocaleProp(
        'ui_caption_hours',
      )} ${_Date.minutesApartHours(m)} ${this.getLocaleProp(
        'ui_caption_minutes',
      )}`,
    );

  renderStatus(val, values) {
    if (val === 0) {
      return '';
    }

    let result = val;

    for (const status of values.statuses) {
      if (val === status.id) {
        result = this.renderPropAnimated(status.i18nStatus);
        break;
      }
    }

    return <span>{result}</span>;
  }

  renderPropAnimated(name, postfix) {
    let value = this.getLocaleProp(name);
    if (postfix) {
      value = value + postfix;
    }

    return (
      <FadeProps animationLength={500}>
        <span key={value}>{value}</span>
      </FadeProps>
    );
  }

  renderCost(cost) {
    return (
      <FadeProps animationLength={500}>
        <span key={this.state.fade}>
          {cost}
          <i className="i-sing voyage__price-icon"></i>
        </span>
      </FadeProps>
    );
  }

  fade = (children) => (
    <FadeProps animationLength={500}>
      <span key={this.state.fade}>{children}</span>
    </FadeProps>
  );

  render() {
    const event = this.props.event;
    const date = new Date();

    return (
      <div
        className={
          'voyage' + this.mapStatus(event.eventStatusId, date, event.startTime)
        }
        key={event.id}
      >
        <Trapeze />

        <div className="voyage__wrapper">
          <div className="voyage__time">
            {this.renderDepartion(event.startTime)}
          </div>
          <div className="voyage__type">
            <Trapeze />

            <div className="voyage__type-wrap">
              <div className="voyage__type-icon">
                {this.renderIcon(event.eventTypeId)}
              </div>
              <div className="voyage__type-body">
                <div className="voyage__type-miss">
                  {this.renderTypeTitle(event.eventTypeId, this.props.refs)}
                </div>
                <div className="voyage__type-title">
                  {this.renderTypeName(event.eventTypeId, this.props.refs)}
                </div>
              </div>
            </div>

            <Trapeze position="_right" />
          </div>
          <div className="voyage__direction">
            {this.renderDestination(event.eventDestinationId, this.props.refs)}
          </div>
          <div className="voyage__price">{this.renderCost(event.cost)}</div>
          <div className="voyage__duration">
            {this.renderDuration(event.durationTime)}
          </div>
          <div className="voyage__status">
            {this.renderStatus(event.eventStatusId, this.props.refs)}
          </div>
        </div>

        <Trapeze position="_right" />
      </div>
    );
  }
}
