import React from 'react';
import { Provider } from 'react-redux';

import { store } from './config/store';
import Main from './components/main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
