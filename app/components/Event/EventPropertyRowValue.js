// @flow
import React, {Component} from 'react';
import {Tile} from 're-bulma';

import styles from './EventPropertyRowTile.css';

export default class EventPropertyRowValue extends Component {

  renderTypeName(eventType, eventTypeSubName) {
    return (
      <span>
        <span className="type_name">{eventType}</span>
        <span>{eventTypeSubName}</span>
      </span>
    );
  }

  renderTypeIcon(eventId, status) {
    let iconName = '';

    if (eventId === 1) {
      iconName = 'radioplate';
    } else if (eventId === 2) {
      iconName = 'spaceman';
    } else if (eventId === 3) {
      iconName = 'solar';
    }

    if (eventId !== 0 && status === 'inactive') {
      iconName += '_dis';
    }

    const src = `../assets/icon/icon_${iconName}_v0.png`;

    return <img className="type_icon" src={src} />;
  }

  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}
