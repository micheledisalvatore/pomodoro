import { all } from 'redux-saga/effects';

import counter from './counter';
import notifications from './notifications';
import session from './session';

const sagas = [
  counter,
  notifications,
  session,
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;
