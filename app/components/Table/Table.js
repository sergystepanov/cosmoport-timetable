// @flow
import React, {Component} from 'react';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.iconsContext = require.context("../../../assets", false, /^\.\/icon_.*v0\.png$/);
  }

  getLocaleProp(property) {
    const locale = this.props.locale;

    return Object
      .prototype
      .hasOwnProperty
      .call(locale, property)
      ? locale[property].values[0]
      : '';
  }

  renderDepartionColumn(minutes) {
    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    return `${ (h < 10
      ? '0'
      : '') + h}:${ (m < 10
      ? '0'
      : '') + m}`;
  }

  renderTypeCol(val, values) {
    let result = val;

    for (const type of values.types) {
      if (val === type.id) {
        result = `${this.getLocaleProp(type.i18nEventTypeName)} / ${this.getLocaleProp(type.i18nEventTypeSubname)}`;
        break;
      }
    }

    return result;
  }

  renderDestCol(val, values) {
    let result = val;

    for (const dest of values.destinations) {
      if (val === dest.id) {
        result = this.getLocaleProp(dest.i18nEventDestinationName);
        break;
      }
    }

    return result;
  }

  renderDurationCol(minutes) {
    let result = minutes;

    const h = Math.trunc(minutes / 60);
    const m = minutes % 60;

    result = `${h} ${this.getLocaleProp('ui_caption_hours')} ${m} ${this.getLocaleProp('ui_caption_minutes')}`;

    return result;
  }

  renderStatusCol(val, values) {
    let result = val;

    for (const status of values.statuses) {
      if (val == status.id) {
        result = this.getLocaleProp(status.i18nStatus);
        break;
      }
    }

    const caption = val < 2
      ? ''
      : result

    return (
      <span className={'status-' + val}>{caption}</span>
    );
  }

  renderRow = (item) => {
    return (
      <div
        key={item.id}
        className={`row ${item.eventStatusId === 6        ? 'canceled'
        : ''}`}>
        <div className="tr">
          <div className="pure-u-1-6">{this.renderDepartionColumn(item.startTime)}</div>
          <div className="pure-u-1-5">
            {this._renderIcon(item.eventTypeId, item.eventStatusId)}
            {this.renderTypeCol(item.eventTypeId, this.props.refs)}
          </div>
          <div className="pure-u-1-6">{this.renderDestCol(item.eventDestinationId, this.props.refs)}</div>
          <div className="pure-u-1-8">{item.cost}&nbsp;€</div>
          <div className="pure-u-1-6">{this.renderDurationCol(item.durationTime)}</div>
          <div className="pure-u-1-6">{this.renderStatusCol(item.eventStatusId, this.props.refs)}</div>
        </div>

      </div>
    );
  }

  _renderIcon(typeId, statusId) {
    let iconName = '';

    if (typeId === 2) {
      iconName = 'radioplate';
    }

    if (typeId === 1) {
      iconName = 'spaceman';
    }

    if (typeId > 2) {
      iconName = 'solar';
    }

    if (iconName !== '' && statusId === 6) {
      iconName += '_dis';
    }

    const src = this.iconsContext(`./icon_${iconName}_v0.png`);

    return <img className="type-icon" src={src}/>;
  }

  render() {
    return (
      <div id="timetable">
        <div id="data" className="pure-g">
          <div className="head-row">
            <div className="th">
              <div className="pure-u-1-6">{this.getLocaleProp('ui_caption_departing')}</div>
              <div className="pure-u-1-5">{this.getLocaleProp('ui_caption_type')}</div>
              <div className="pure-u-1-6">{this.getLocaleProp('ui_caption_destination')}</div>
              <div className="pure-u-1-8">{this.getLocaleProp('ui_caption_cost')}</div>
              <div className="pure-u-1-6">{this.getLocaleProp('ui_caption_duration')}</div>
              <div className="pure-u-1-6">{this.getLocaleProp('ui_caption_status')}</div>
            </div>
          </div>
          {this
            .props
            .events
            .map(this.renderRow)}
        </div>
      </div>
    );
  }
}
