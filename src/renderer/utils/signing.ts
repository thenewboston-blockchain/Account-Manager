import {sign, SignKeyPair} from 'tweetnacl';
import orderBy from 'lodash/orderBy';

import {Tx} from '@renderer/types';

export const generateBlock = (
  accountNumber: string,
  balanceLock: string,
  signingKey: Uint8Array,
  transactions: Tx[],
) => {
  const message = {
    balance_key: balanceLock,
    txs: orderBy(transactions, ['recipient']),
  };
  const strMessage: string = JSON.stringify(message);
  const block = {
    account_number: accountNumber,
    message,
    signature: generateSignature(strMessage, signingKey),
  };
  return JSON.stringify(block);
};

export const generateSignature = (message: string, secretKey: Uint8Array) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(message);
  const signatureArray = sign(encodedData, secretKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
};

export const getKeyPairDetails = (keyPair: SignKeyPair) => {
  const {publicKey, secretKey} = keyPair;
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const secretKeyHex = Buffer.from(secretKey).toString('hex');
  return {
    publicKey,
    publicKeyHex,
    secretKey,
    secretKeyHex: secretKeyHex.replace(publicKeyHex, ''),
  };
};

export const getKeyPairFromSigningKeyHex = (signingKeyHex: string) => {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return getKeyPairDetails(keyPair);
};
