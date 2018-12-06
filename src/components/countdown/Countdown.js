import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container, Number, Svg, Circle,
} from './Countdown.styled';

export class Countdown extends Component {
  constructor(props) {
    super(props);

    const { duration, isPaused, pauseDuration } = props;

    this.state = {
      end: Math.floor(Date.now() / 1000) + duration,
      timing: duration,
      interval: isPaused ? 0 : this.setInterval(),
      isPaused,
      pauseDuration,
    };
  }

  componentDidUpdate(prevProps) {
    const { duration, isPaused, pauseDuration } = this.props;
    const { interval } = this.state;

    if (prevProps.duration !== duration || prevProps.isPaused !== isPaused) {
      window.clearInterval(interval);

      this.setState(({ end }) => ({
        timing: end + pauseDuration - Math.floor(Date.now() / 1000),
        interval: isPaused ? 0 : this.setInterval(),
        isPaused,
        pauseDuration,
      }));
    }
  }

  setInterval = () => window.setInterval(() => {
    const { timing, interval } = this.state;
    const { onEnd } = this.props;

    if (timing > 0) {
      this.setState(({ end, pauseDuration }) => ({
        timing: end + pauseDuration - Math.floor(Date.now() / 1000),
      }));
    } else {
      onEnd();
      window.clearInterval(interval);
    }
  }, 1000)

  get timing() {
    const { timing } = this.state;
    const minutes = Math.floor(timing / 60).toString().padStart(2, '0');
    const seconds = (timing % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  render() {
    const { color, duration } = this.props;
    const { isPaused } = this.state;

    return (
      <Container>
        <Number color={color}>{this.timing}</Number>
        <Svg>
          <Circle duration={duration} color={color} isPaused={isPaused} />
        </Svg>
      </Container>
    );
  }
}

Countdown.propTypes = {
  color: PropTypes.string.isRequired,
  duration: PropTypes.number,
  isPaused: PropTypes.bool,
  onEnd: PropTypes.func.isRequired,
  pauseDuration: PropTypes.number,
};

Countdown.defaultProps = {
  duration: 10,
  pauseDuration: 0,
  isPaused: true,
};
