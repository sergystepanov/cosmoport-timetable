import React, { Component } from 'react';

export default class FadeProps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChild: this.props.children
        ? React.Children.only(this.props.children)
        : null,
      nextChild: null,
      changed: false,
      animationLength: this.props.animationLength || 200,
      opacity: 1
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextChild = nextProps.children
      ? React.Children.only(nextProps.children)
      : false;
    clearTimeout(this.timeoutID);

    if (nextChild && nextChild.key === this.state.currentChild.key) {
      this.setState({ changed: false, currentChild: nextChild });
    } else {
      this.setState({ nextChild, changed: true });
    }
  }

  componentDidUpdate() {
    if (this.state.changed && this.state.currentChild !== false) {
      let opacity = 1, complete;
      if (this.state.nextChild || this.state.nextChild === false) {
        opacity = 0;
        complete = this.queueNextChild;
      } else {
        complete = this.resetView;
      }

      this.currentChild.style.opacity = opacity;
      this.timeoutID = setTimeout(complete, this.state.animationLength);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  queueNextChild = () => {
    this.setState({
      currentChild: this.state.nextChild,
      nextChild: null,
      opacity: 0
    });
  }

  resetView = () => {
    this.setState({ opacity: 1, changed: false });
  }

  render() {
    const { opacity, animationLength } = this.state;
    const style = {
      opacity,
      transition: `opacity ${animationLength}ms ease-in`
    };

    return (
      <div className={this.props.className}>
        <div ref={c => { this.currentChild = c }} style={style}>
          {this.state.currentChild}
        </div>
      </div>
    )
  }
}
