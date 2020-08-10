import {sign} from 'tweetnacl';

export const createAccount = () => {
  const {publicKey, secretKey} = sign.keyPair();
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const secretKeyHex = Buffer.from(secretKey).toString('hex');

  return {
    publicKey,
    publicKeyHex,
    secretKey,
    secretKeyHex: secretKeyHex.replace(publicKeyHex, ''),
  };
};

export const signMessage = (message: string, secretKey: Uint8Array) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode('Hey');
  const signatureArray = sign(encodedData, secretKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
};
