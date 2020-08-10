import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import {createAccount, signMessage} from './signing';
import 'typeface-roboto';
import 'normalize.css';
import './styles/main.scss';

const payload = JSON.stringify({
  balance_key: '6cb8f4fe23c57a1c169e5a193c59ad9f21bbe5a54d69c44a4522f4644bf5b2a2',
  txs: [
    {
      amount: 5.5,
      recipient: '484b3176c63d5f37d808404af1a12c4b9649cd6f6769f35bdf5a816133623fbc',
    },
    {
      amount: 1,
      recipient: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
    },
    {
      amount: 4,
      recipient: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    },
  ],
});
console.error(payload);

const {publicKeyHex, secretKey, secretKeyHex} = createAccount();
const signature = signMessage(payload, secretKey);
console.log(secretKeyHex);
// console.log(publicKeyHex);
console.log(signature);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
