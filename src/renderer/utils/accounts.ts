import {sign} from 'tweetnacl';

import {getKeyPairDetails} from '@renderer/utils/signing';

export const createAccount = () => {
  const keyPair = sign.keyPair();
  return getKeyPairDetails(keyPair);
};
