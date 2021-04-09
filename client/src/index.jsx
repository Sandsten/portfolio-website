import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';

import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.querySelector('#root')
);