import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  pauseSession,
  startSession,
} from '../../actions/session';

import { Button, PlayIcon, PauseIcon } from './Controller.styled';

export const Controller = ({ isPaused, startSessionAction, pauseSessionAction }) => {
  const toggleCountdown = () => (isPaused ? startSessionAction() : pauseSessionAction());

  return (
    <Button onClick={toggleCountdown}>
      { isPaused ? <PlayIcon /> : <PauseIcon /> }
    </Button>
  );
};

Controller.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  pauseSessionAction: PropTypes.func.isRequired,
  startSessionAction: PropTypes.func.isRequired,
};

export const mapStateToProps = ({
  session: {
    isPaused,
  },
}) => ({
  isPaused,
});

export const mapDispatchToProps = dispatch => ({
  pauseSessionAction: bindActionCreators(pauseSession, dispatch),
  startSessionAction: bindActionCreators(startSession, dispatch),
});
