// @flow
import React, {Component} from 'react';

import Trapeze from '../Decoration/Trapeze';

export default class TableHeader extends Component {
  getLocaleProp(property) {
    const locale = this.props.locale;

    return Object
      .prototype
      .hasOwnProperty
      .call(locale, property)
      ? locale[property].values[0]
      : '';
  }

  render() {
    return (
      <div className="head">
        <Trapeze />
        <div className="head__wrap">
          <div className="head__time">{this.getLocaleProp('ui_caption_departing')}</div>
          <div className="head__type">{this.getLocaleProp('ui_caption_type')}</div>
          <div className="head__direction">{this.getLocaleProp('ui_caption_destination')}</div>
          <div className="head__price">{this.getLocaleProp('ui_caption_cost')}</div>
          <div className="head__duration">{this.getLocaleProp('ui_caption_duration')}</div>
          <div className="head__status">{this.getLocaleProp('ui_caption_status')}</div>
        </div>
        <Trapeze position="_right"/>
      </div>
    );
  }
}
