import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import 'typeface-roboto';
import 'normalize.css';
import './styles/main.scss';

const txs = [
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
];

const createBlock = async (): Promise<void> => {
  const signingKeyHex = 'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02';
  const balanceLock = 'ca6c8944fea472ad41523d77e413a2c464cbc0338be1fc3377e286c7d0c0e602';
  const {publicKeyHex, secretKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
  const block = generateBlock(publicKeyHex, balanceLock, secretKey, txs);
  const response = await axios.post('http://167.99.173.247/blocks', block, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.error(response);
};

createBlock();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
