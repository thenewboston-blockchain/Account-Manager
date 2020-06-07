import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// Styles
import 'typeface-roboto';
import 'normalize.css';
import '@renderer/styles/variables.scss';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import './renderer.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
