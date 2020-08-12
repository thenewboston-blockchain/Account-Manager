import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import App from '@renderer/containers/App';
import store from '@renderer/store';
import {Tx} from '@renderer/types';

import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import 'typeface-roboto';
import 'normalize.css';
import './styles/main.scss';

const txs: Tx[] = [
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
  const signingKeyHex = '4e5804d995d5ab84afb85154d7645c73c8fedb80723a262787c2428e59051b58';
  const {publicKeyHex, secretKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
  const balanceLock = 'c88d1b0d55f430b66ad603993b76d7e9bd147b7209e13b2bb548fb680905dc8d';
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
