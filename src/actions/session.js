import {
  SESSION_START,
  SESSION_PAUSE,
  SESSION_COMPLETE,
  SESSION_SET_TIMING,
} from '../constants/session';

export const startSession = session => ({
  type: SESSION_START,
  session,
});

export const completeSession = () => ({
  type: SESSION_COMPLETE,
});

export const pauseSession = () => ({
  type: SESSION_PAUSE,
});

export const setTiming = timing => ({
  type: SESSION_SET_TIMING,
  timing,
});
