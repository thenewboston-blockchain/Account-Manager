import {sign, SignKeyPair} from 'tweetnacl';
import orderBy from 'lodash/orderBy';

import {Tx} from '@renderer/types';

export const generateBlock = (
  accountNumberHex: string,
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
    account_number: accountNumberHex,
    message,
    signature: generateSignature(strMessage, signingKey),
  };
  return JSON.stringify(block);
};

export const generateSignature = (message: string, signingKey: Uint8Array) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(message);
  const signatureArray = sign(encodedData, signingKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
};

export const getKeyPairDetails = (keyPair: SignKeyPair) => {
  const {publicKey: accountNumber, secretKey: signingKey} = keyPair;
  const accountNumberHex = Buffer.from(accountNumber).toString('hex');
  const signingKeyHex = Buffer.from(signingKey).toString('hex');
  return {
    accountNumber,
    accountNumberHex,
    signingKey,
    signingKeyHex: signingKeyHex.replace(accountNumberHex, ''),
  };
};

export const getKeyPairFromSigningKeyHex = (signingKeyHex: string) => {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return getKeyPairDetails(keyPair);
};
