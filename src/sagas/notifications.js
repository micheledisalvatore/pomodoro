import {
  fork,
  select,
  takeLatest,
} from 'redux-saga/effects';
import Notify from 'notifyjs';

import {
  COUNTER_SESSIONS,
  COUNTER_GOALS,
} from '../constants/counter';

import {
  SESSION_COMPLETE,
  SESSION_START,
} from '../constants/session';

function askPermission() {
  if (Notify.needsPermission && Notify.isSupported()) {
    Notify.requestPermission();
  }
}

const getCounterState = ({ counter }) => counter;

function* sendMessage() {
  const {
    isTimeFocus,
    isTimeShortBreak,
    isTimeLongBreak,
    currentSession,
    currentGoal,
  } = yield select(getCounterState);

  if (!Notify.needsPermission) {
    if (isTimeFocus) {
      (new Notify('Focus', { body: `Time to be focused for 25 minutes (round ${currentSession} of ${COUNTER_SESSIONS})` })).show();
    } else if (isTimeShortBreak) {
      (new Notify('Short break', { body: `Time to take a break of 5 minutes (round ${currentSession} of ${COUNTER_SESSIONS})` })).show();
    } else if (isTimeLongBreak) {
      (new Notify('Long break', { body: `Time to relax for 30 minutes (goal ${currentGoal} of ${COUNTER_GOALS})` })).show();
    }
  }
}

function* watchActions() {
  yield takeLatest(SESSION_START, askPermission);
  yield takeLatest(SESSION_COMPLETE, sendMessage);
}

export default fork(watchActions);
