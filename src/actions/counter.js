import {
  COUNTER_SET_NEW_SESSION,
} from '../constants/counter';

export const setNewSession = payload => ({
  type: COUNTER_SET_NEW_SESSION,
  ...payload,
});
