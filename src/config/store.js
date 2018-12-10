import { createStore, compose } from 'redux';

import reducers from '../reducers';
import applyMiddlewares, { sagaMiddleware } from '../middlewares';
import sagas from '../sagas';

/* eslint-disable no-underscore-dangle */
const reduxDevTools = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

export const store = createStore(
  reducers,
  compose(
    applyMiddlewares,
    reduxDevTools,
  ),
);

sagaMiddleware.run(sagas);
