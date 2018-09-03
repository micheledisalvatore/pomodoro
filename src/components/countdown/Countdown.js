import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Number, Svg, Circle } from './Countdown.styled';

export class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      end: Math.floor(Date.now() / 1000) + props.duration,
      timing: props.duration,
      interval: this.setInterval(),
      isPaused: props.isPaused,
      pauseDuration: props.pauseDuration,
    }
  }

  setInterval = () => window.setInterval(() => {
    if(this.state.timing > 0) {
      this.setState(({ end, pauseDuration, timing }) => ({ timing: end + pauseDuration - Math.floor(Date.now() / 1000) }))
    } else {
      this.props.onEnd();
      window.clearInterval(this.state.interval)
    }
  }, 1000)

  componentDidUpdate(prevProps) {
    if(prevProps.duration !== this.props.duration || prevProps.isPaused !== this.props.isPaused) {
      window.clearInterval(this.state.interval)

      this.setState(({ end }) => ({
        timing: end + this.props.pauseDuration - Math.floor(Date.now() / 1000),
        interval: this.props.isPaused ? 0 : this.setInterval(),
        isPaused: this.props.isPaused,
        pauseDuration: this.props.pauseDuration,
      }))
    }
  }

  get timing() {
    const minutes = Math.floor(this.state.timing / 60).toString().padStart(2, '0');
    const seconds = (this.state.timing % 60).toString().padStart(2, '0');
    
    return `${minutes}:${seconds}`
  }

  render() {
    return (
      <Container>
        <Number color={this.props.color}>{this.timing}</Number>
        <Svg>
          <Circle duration={this.props.duration} color={this.props.color} isPaused={this.props.isPaused} />
        </Svg>
      </Container>
    );
  }
}

Countdown.propTypes = {
  duration: PropTypes.number,
}

Countdown.defaultProps = {
  duration: 10
}