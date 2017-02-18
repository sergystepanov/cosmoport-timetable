// @Flow
import React, {Component} from 'react';

import Trapeze from '../Decoration/Trapeze';
import Locale from '../../class/Locale';

export default class TableRow extends Component {

  getLocaleProp(prop) {
    return Locale.getLocaleProp(this.props.locale, prop);
  }

  mapStatus(statusId) {
    const map = {
      6: 'finish',
      4: 'landing',
      3: 'cancel',
      7: 'pre-order'
    };

    return map[statusId]
      ? ' voyage--' + map[statusId]
      : '';
  }

  renderIcon(typeId) {
    let name = '';

    if (typeId === 2) {
      name = 'i-radar';
    }

    if (typeId === 1) {
      name = 'i-man';
    }

    if (typeId > 2) {
      name = 'i-space-small';
    }

    return <i className={name}></i>;
  }

  renderDepartion(minutes) {
    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    return `${ (h < 10
      ? '0'
      : '') + h}:${ (m < 10
      ? '0'
      : '') + m}`;
  }

  renderTypeTitle(val, values) {
    let result = val;

    for (const type of values.types) {
      if (val === type.id) {
        result = `${this.getLocaleProp(type.i18nEventTypeName)}:`;
        break;
      }
    }

    return result;
  }

  renderTypeName(val, values) {
    let result = val;

    for (const type of values.types) {
      if (val === type.id) {
        result = `${this.getLocaleProp(type.i18nEventTypeSubname)}`;
        break;
      }
    }

    return result;
  }

  renderDestination(val, values) {
    let result = val;

    for (const dest of values.destinations) {
      if (val === dest.id) {
        result = this.getLocaleProp(dest.i18nEventDestinationName);
        break;
      }
    }

    return result;
  }

  renderDuration(minutes) {
    let result = minutes;

    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    result = `${h} ${this.getLocaleProp('ui_caption_hours')} ${m} ${this.getLocaleProp('ui_caption_minutes')}`;

    return result;
  }

  renderStatus(val, values) {
    let result = val;

    for (const status of values.statuses) {
      if (val == status.id) {
        result = this.getLocaleProp(status.i18nStatus);
        break;
      }
    }

    // Don't show status text for all events with id < 2
    const caption = val < 2
      ? ''
      : result

    return (
      <span>{caption}</span>
    );
  }

  render() {
    const event = this.props.event;

    return (
      <div className={"voyage" + this.mapStatus(event.eventStatusId)} key={event.id}>
        <Trapeze/>

        <div className="voyage__wrapper">
          <div className="voyage__time">{this.renderDepartion(event.startTime)}</div>
          <div className="voyage__type">
            <Trapeze/>

            <div className="voyage__type-wrap">
              <div className="voyage__type-icon">
                {this.renderIcon(event.eventTypeId)}
              </div>
              <div className="voyage__type-body">
                <div className="voyage__type-miss">{this.renderTypeTitle(event.eventTypeId, this.props.refs)}</div>
                <div className="voyage__type-title">{this.renderTypeName(event.eventTypeId, this.props.refs)}</div>
              </div>
            </div>

            <Trapeze position="_right"/>
          </div>
          <div className="voyage__direction">
            {this.renderDestination(event.eventDestinationId, this.props.refs)}
          </div>
          <div className="voyage__price">{event.cost}
            <i className="i-sing voyage__price-icon"></i>
          </div>
          <div className="voyage__duration">{this.renderDuration(event.durationTime)}</div>
          <div className="voyage__status">
            {this.renderStatus(event.eventStatusId, this.props.refs)}
          </div>
        </div>

        <Trapeze position="_right"/>
      </div>
    );
  }
}
