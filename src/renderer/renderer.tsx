import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import {createAccount, signMessage} from './signing';
import 'typeface-roboto';
import 'normalize.css';
import './styles/main.scss';

const {publicKeyHex, secretKey, secretKeyHex} = createAccount();
const signature = signMessage('Hey', secretKey);
console.log(secretKeyHex);
console.log(publicKeyHex);
console.log(signature);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
