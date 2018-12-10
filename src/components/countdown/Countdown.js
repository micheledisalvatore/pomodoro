import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Number, Svg, Circle,
} from './Countdown.styled';

export const Countdown = ({
  color,
  length,
  isPaused,
  timing,
}) => {
  const minutes = Math.floor(timing / 60).toString().padStart(2, '0');
  const seconds = (timing % 60).toString().padStart(2, '0');

  return (
    <Container>
      <Number color={color}>{minutes}:{seconds}</Number>
      { timing > 0 && (
        <Svg>
          <Circle duration={length} color={color} isPaused={isPaused} />
        </Svg>
      )}
    </Container>
  );
};

Countdown.propTypes = {
  color: PropTypes.string.isRequired,
  isPaused: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
  timing: PropTypes.number.isRequired,
};

export const mapStateToProps = ({
  session: {
    color,
    isPaused,
    length,
    timing,
  },
}) => ({
  color,
  length,
  isPaused,
  timing,
});
