import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from '@renderer/containers/App';
import store from '@renderer/store';
import 'typeface-roboto';
import 'normalize.css';

import '@thenewboston/ui/src/styles/colors.css';
import '@thenewboston/ui/src/styles/font.css';
import './styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
