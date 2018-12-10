import { handleActions } from 'redux-actions';

import {
  SESSION_START,
  SESSION_PAUSE,
  SESSION_COMPLETE,
  SESSION_SET_TIMING,
  SESSIONS,
} from '../constants/session';

const defaultState = {
  label: SESSIONS.FOCUS.label,
  color: SESSIONS.FOCUS.color,
  end: null,
  isPaused: true,
  pauseLength: 0,
  pauseStart: null,
  timing: SESSIONS.FOCUS.length,
  length: SESSIONS.FOCUS.length,
};

const getNow = () => Math.floor(Date.now() / 1000);

const start = (state, { session = SESSIONS.FOCUS }) => {
  const newState = state;
  const {
    isPaused,
    pauseStart,
    pauseLength,
  } = newState;
  const isResumed = isPaused && pauseStart !== null;

  newState.isPaused = false;

  if (isResumed) {
    return {
      ...newState,
      pauseLength: pauseLength + (getNow() - pauseStart),
      pauseStart: null,
    };
  }
  const { length, color, label } = session;

  return {
    ...newState,
    color,
    label,
    length,
    end: getNow() + length,
    timing: length,
  };
};

const pause = state => ({
  ...state,
  pauseStart: getNow(),
  isPaused: true,
});

const complete = () => defaultState;

const setTiming = (state, { timing }) => ({
  ...state,
  ...(!state.isPaused && { timing }),
});

export default handleActions({
  [SESSION_START]: start,
  [SESSION_PAUSE]: pause,
  [SESSION_COMPLETE]: complete,
  [SESSION_SET_TIMING]: setTiming,
}, defaultState);
