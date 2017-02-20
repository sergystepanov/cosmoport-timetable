import React, {Component} from 'react';

import Trapeze from '../Decoration/Trapeze';
import FadeProps from 'fade-props';

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

  renderPropAnimated(name) {
    return (
      <FadeProps animationLength={500}>
        <span key={this.getLocaleProp(name)}>{this.getLocaleProp(name)}</span>
      </FadeProps>
    );
  }

  render() {
    return (
      <div className="head">
        <Trapeze/>
        <div className="head__wrap">
          <div className="head__time">
            {this.renderPropAnimated('ui_caption_departing')}
          </div>
          <div className="head__type">{this.renderPropAnimated('ui_caption_type')}</div>
          <div className="head__direction">{this.renderPropAnimated('ui_caption_destination')}</div>
          <div className="head__price">{this.renderPropAnimated('ui_caption_cost')}</div>
          <div className="head__duration">{this.renderPropAnimated('ui_caption_duration')}</div>
          <div className="head__status">{this.renderPropAnimated('ui_caption_status')}</div>

        </div>
        <Trapeze position="_right"/>
      </div>
    );
  }
}
