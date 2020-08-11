import {sign, SignKeyPair} from 'tweetnacl';

export const createAccount = () => {
  const keyPair = sign.keyPair();
  return keyPairObject(keyPair);
};

// def generate_block(*, account_number, balance_lock, signing_key, transactions):
// """
// Generate block
// """
//
// message = {
//   'balance_key': balance_lock,
//   'txs': sorted(transactions, key=itemgetter('recipient'))
// }
//
// signature = generate_signature(
//   message=sort_and_encode(message),
//   signing_key=signing_key
// )
//
// block = {
//   'account_number': encode_verify_key(verify_key=account_number),
//   'message': message,
//   'signature': signature
// }
//
// return block

export const generateBlock = (
  accountNumber: string,
  balanceLock: string,
  signingKey: Uint8Array,
  transactions: any[],
) => {
  const message = {
    balance_key: balanceLock,
    txs: transactions,
  };
  const strMessage: string = JSON.stringify(message);
  const block = {
    account_number: accountNumber,
    message,
    signature: signMessage(strMessage, signingKey),
  };
  return JSON.stringify(block);
};

export const keyPairFromSigningKeyHex = (signingKeyHex: string) => {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return keyPairObject(keyPair);
};

const keyPairObject = (keyPair: SignKeyPair) => {
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

export const signMessage = (message: string, secretKey: Uint8Array) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(message);
  const signatureArray = sign(encodedData, secretKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
};
