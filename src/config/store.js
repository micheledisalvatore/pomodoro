import { createStore, compose } from 'redux';

import reducers from '../reducers';
import applyMiddlewares, { sagaMiddleware } from '../middlewares';
import sagas from '../sagas';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddlewares,
  ),
);

sagaMiddleware.run(sagas);
