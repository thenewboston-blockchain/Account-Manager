import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// Styles
import 'typeface-roboto';
import 'normalize.css';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import './styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
