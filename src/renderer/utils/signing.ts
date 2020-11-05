import {sign, SignKeyPair} from 'tweetnacl';
import orderBy from 'lodash/orderBy';

import {Tx} from '@renderer/types';

export const generateBlock = (
  balanceLock: string,
  publicKeyHex: string,
  signingKey: Uint8Array,
  transactions: Tx[],
) => {
  const message = {
    balance_key: balanceLock,
    txs: orderBy(transactions, ['recipient']),
  };
  const strMessage: string = JSON.stringify(message);
  const block = {
    account_number: publicKeyHex,
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

export const generateSignedMessage = (message: any, publicKeyHex: string, signingKey: Uint8Array) => {
  const strMessage = JSON.stringify(message);
  const signedMessage = {
    message,
    node_identifier: publicKeyHex,
    signature: generateSignature(strMessage, signingKey),
  };
  return JSON.stringify(signedMessage);
};

export const getKeyPairDetails = (keyPair: SignKeyPair) => {
  const {publicKey, secretKey: signingKey} = keyPair;
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const signingKeyHex = Buffer.from(signingKey).toString('hex');
  return {
    publicKey,
    publicKeyHex,
    signingKey,
    signingKeyHex: signingKeyHex.replace(publicKeyHex, ''),
  };
};

export const getKeyPairFromSigningKeyHex = (signingKeyHex: string) => {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return getKeyPairDetails(keyPair);
};
