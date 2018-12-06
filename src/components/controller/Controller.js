import React from 'react';
import PropTypes from 'prop-types';

import { Button, PlayIcon, PauseIcon } from './Controller.style';

export const Controller = ({ isPaused, onClick }) => (
  <Button onClick={onClick}>
    { isPaused ? <PlayIcon /> : <PauseIcon /> }
  </Button>
);

Controller.propTypes = {
  isPaused: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Controller.defaultProps = {
  isPaused: false,
};
