import { handleActions } from 'redux-actions';

import { SESSIONS } from '../constants/session';
import { COUNTER_SET_NEW_SESSION } from '../constants/counter';

const defaultState = {
  sessionTypeLabel: SESSIONS.FOCUS.label,
  sessionNumber: 0,
  goalNumber: 0,
};

const setNewSession = (state, { type, ...payload }) => ({
  ...state,
  ...payload,
});

export default handleActions({
  [COUNTER_SET_NEW_SESSION]: setNewSession,
}, defaultState);
