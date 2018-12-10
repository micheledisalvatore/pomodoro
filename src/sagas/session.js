import {
  call,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setTiming, completeSession } from '../actions/session';
import { SESSION_START, SESSION_PAUSE } from '../constants/session';

function countdown(end, pauseLength) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      const seconds = end + pauseLength - Math.floor(Date.now() / 1000);

      if (seconds > -1) {
        emitter(seconds);
      } else {
        emitter(END);
      }
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  });
}

let interval;

const getSession = ({ session }) => session;

function* startCountdown() {
  const { end, pauseLength } = yield select(getSession);

  interval = yield call(countdown, end, pauseLength);
  try {
    while (true) {
      const timing = yield take(interval);
      yield put(setTiming(timing));
    }
  } finally {
    const { isPaused } = yield select(getSession);

    if (!isPaused) {
      yield put(completeSession());
    }
  }
}

function pauseCountdown() {
  interval.close();
}

function* watchActions() {
  yield takeLatest(SESSION_START, startCountdown);
  yield takeLatest(SESSION_PAUSE, pauseCountdown);
}

export default fork(watchActions);
