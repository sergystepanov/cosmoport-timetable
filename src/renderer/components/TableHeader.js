import React, { Component } from 'react';

import Trapeze from './Trapeze';
import FadeProps from '../class/Fade';
import Locale from '../class/Locale';

export default class TableHeader extends Component {
  renderPropAnimated(name) {
    const { locale } = this.props;

    return (
      <FadeProps animationLength={500}>
        <span key={Locale.getLocaleProp(name, locale)}>
          {Locale.getLocaleProp(name, locale)}
        </span>
      </FadeProps>
    );
  }

  render() {
    return (
      <div className="head">
        <Trapeze />
        <div className="head__wrap">
          <div className="head__time">
            {this.renderPropAnimated('ui_caption_departing')}
          </div>
          <div className="head__type">
            {this.renderPropAnimated('ui_caption_type')}
          </div>
          <div className="head__direction">
            {this.renderPropAnimated('ui_caption_destination')}
          </div>
          <div className="head__price">
            {this.renderPropAnimated('ui_caption_cost')}
          </div>
          <div className="head__duration">
            {this.renderPropAnimated('ui_caption_duration')}
          </div>
          <div className="head__status">
            {this.renderPropAnimated('ui_caption_status')}
          </div>
        </div>
        <Trapeze position="_right" />
      </div>
    );
  }
}
