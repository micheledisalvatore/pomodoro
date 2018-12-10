import {
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { COUNTER_SESSIONS, COUNTER_GOALS } from '../constants/counter';
import { setNewSession } from '../actions/counter';
import { SESSION_COMPLETE, SESSIONS } from '../constants/session';
import { startSession } from '../actions/session';

const getCounterState = ({ counter }) => counter;

function* start() {
  const {
    goalNumber: prevGoalNumber,
    sessionNumber: prevSessionNumber,
    sessionTypeLabel: prevSessionTypeLabel,
  } = yield select(getCounterState);

  let goalNumber = prevGoalNumber;
  let sessionNumber = prevSessionNumber;

  const isLongBreakSession = prevSessionTypeLabel === SESSIONS.LONG_BREAK.label;
  const shouldResetCounter = isLongBreakSession && goalNumber === COUNTER_GOALS;
  let sessionType;

  switch (prevSessionTypeLabel) {
    case SESSIONS.FOCUS.label:
      if (sessionNumber < COUNTER_SESSIONS) {
        sessionType = SESSIONS.SHORT_BREAK;
      } else {
        sessionType = SESSIONS.LONG_BREAK;
      }
      break;
    case SESSIONS.LONG_BREAK.label:
      sessionType = SESSIONS.FOCUS;
      sessionNumber = 1;
      goalNumber = shouldResetCounter ? 1 : goalNumber;
      break;
    default:
      sessionType = SESSIONS.FOCUS;
      sessionNumber += 1;
      goalNumber += 1;
      break;
  }

  yield put(setNewSession({
    goalNumber,
    sessionNumber,
    sessionTypeLabel: sessionType.label,
  }));

  if (!shouldResetCounter) {
    yield put(startSession(sessionType));
  }
}

function* watchActions() {
  yield takeLatest(SESSION_COMPLETE, start);
}

export default fork(watchActions);
