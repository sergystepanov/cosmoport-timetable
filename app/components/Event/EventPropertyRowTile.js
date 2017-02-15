// @flow
import React, {Component} from 'react';
import {Tile} from 're-bulma';

import EventPropertyTitle from './EventPropertyTitle';
import styles from './EventPropertyRowTile.css';

export default class EventPropertyRowTile extends Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.iconsContext = require.context("../../../assets", false, /^\.\/icon_.*v0\.png$/);
  }

  renderTypeName(eventType, eventTypeSubName) {
    return (
      <span>
        <span className="type_name">{eventType}</span>
        <span>{eventTypeSubName}</span>
      </span>
    );
  }

  renderTypeIcon(eventId, render, status) {
    if (!render) {
      return '';
    }

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

    const src = this.iconsContext(`./icon_${iconName}_v0.png`);

    return <img className="type_icon" src={src} />;
  }

  render() {
    return (
      <Tile context="isChild" className={styles.property_block}>
        <Tile size="is4">
          <EventPropertyTitle value={this.props.title} />
        </Tile>

        <Tile className={styles.value_container}>
          <div className={styles.event_type_container}>
            {this.renderTypeIcon(1, this.props.renderIcon)}
            <div>{this.props.value}</div>
          </div>
        </Tile>
      </Tile>
    );
  }
}
