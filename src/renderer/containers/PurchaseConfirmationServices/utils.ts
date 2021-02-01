import axios from 'axios';
import omit from 'lodash/omit';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';
import {BaseValidator, ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {generateSignedMessage, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

export type SelectedValidatorState = {
  [nodeIdentifier: string]: BaseValidator & {
    index: number;
  };
};

export type ValidatorFormState = {
  [nodeIdentifier: string]: {
    amount: string;
    status: ValidatorConnectionStatus;
  };
};

enum SelectedValidatorTypes {
  clearAll = 'clearAll',
  toggle = 'toggle',
}

enum ValidatorFormTypes {
  set = 'set',
  remove = 'remove',
}

type SelectedValidatorPayload = BaseValidator & {
  index: number;
};

interface ValidatorFormSetPayload {
  amount: string;
  nodeIdentifier: string;
  status: ValidatorConnectionStatus;
}

interface ValidatorFormRemovePayload {
  nodeIdentifier: string;
}

export interface SelectedValidatorAction {
  type: SelectedValidatorTypes;
  payload?: SelectedValidatorPayload;
}

export interface ValidatorFormAction {
  type: ValidatorFormTypes;
  payload: {
    amount?: string;
    nodeIdentifier: string;
    status?: ValidatorConnectionStatus;
  };
}

export const checkConnectionBankToValidator = async (
  managedBank: ManagedNode,
  validator: BaseValidator,
): Promise<void> => {
  const bankAddress = formatAddressFromNode(managedBank);

  try {
    await axios.get(`${bankAddress}/validators/${validator.node_identifier}`, {timeout: AXIOS_TIMEOUT_MS});
  } catch (error) {
    if (!managedBank.nid_signing_key) throw new Error('No NID SK');
    const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(managedBank.nid_signing_key);
    const validatorData = {
      account_number: validator.account_number,
      daily_confirmation_rate: validator.daily_confirmation_rate,
      ip_address: validator.ip_address,
      node_identifier: validator.node_identifier,
      protocol: validator.protocol,
      root_account_file: validator.root_account_file,
      root_account_file_hash: validator.root_account_file_hash,
      trust: 0,
      version: validator.version,
    };
    const signedMessage = generateSignedMessage(validatorData, publicKeyHex, signingKey);
    await axios.post(`${bankAddress}/validators`, signedMessage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const checkConnectionValidatorToBank = async (
  managedBank: ManagedNode,
  validator: BaseValidator,
  bankNodeIdentifier: string,
): Promise<void> => {
  const validatorAddress = formatAddressFromNode(validator);

  try {
    await axios.get(`${validatorAddress}/banks/${bankNodeIdentifier}`, {timeout: AXIOS_TIMEOUT_MS});
  } catch (error) {
    if (!managedBank.nid_signing_key) throw new Error('No NID SK');
    const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(managedBank.nid_signing_key);
    const connectionRequestData = {
      ip_address: managedBank.ip_address,
      port: managedBank.port,
      protocol: managedBank.protocol,
    };
    const signedMessage = generateSignedMessage(connectionRequestData, publicKeyHex, signingKey);
    await axios.post(`${validatorAddress}/connection_requests`, signedMessage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const clearSelectedValidator = (): SelectedValidatorAction => {
  return {
    type: SelectedValidatorTypes.clearAll,
  };
};

export const toggleSelectedValidator = (payload: SelectedValidatorPayload): SelectedValidatorAction => {
  return {
    payload,
    type: SelectedValidatorTypes.toggle,
  };
};

export const setValidatorInForm = (payload: ValidatorFormSetPayload): ValidatorFormAction => {
  return {
    payload,
    type: ValidatorFormTypes.set,
  };
};

export const removeValidatorInForm = (payload: ValidatorFormRemovePayload): ValidatorFormAction => {
  return {
    payload,
    type: ValidatorFormTypes.remove,
  };
};

export const selectedValidatorReducer = (
  state: SelectedValidatorState,
  {payload, type}: SelectedValidatorAction,
): SelectedValidatorState => {
  switch (type) {
    case SelectedValidatorTypes.toggle: {
      const {node_identifier: nodeIdentifier} = payload!;
      if (nodeIdentifier in state) {
        return omit(state, nodeIdentifier);
      }
      return {
        ...state,
        [nodeIdentifier]: {
          ...payload!,
        },
      };
    }
    case SelectedValidatorTypes.clearAll: {
      return {};
    }
    default:
      throw new Error('Invalid SelectedValidatorActionType');
  }
};

export const validatorFormReducer = (
  state: ValidatorFormState,
  {payload, type}: ValidatorFormAction,
): ValidatorFormState => {
  switch (type) {
    case ValidatorFormTypes.set: {
      return Object.entries(state).reduce((acc, [nodeIdentifier, oldState]): ValidatorFormState => {
        if (nodeIdentifier === payload.nodeIdentifier) {
          return {
            ...acc,
            [nodeIdentifier]: {
              amount: payload.amount,
              status: payload.status,
            },
          };
        }
        return {
          ...acc,
          [nodeIdentifier]: oldState,
        };
      }, {});
    }
    case ValidatorFormTypes.remove: {
      return omit(state, payload.nodeIdentifier);
    }
    default:
      throw new Error('Invalid SelectedValidatorActionType');
  }
};

export enum ValidatorConnectionStatus {
  checking = 'checking',
  connected = 'connected',
  notConnected = 'not-connected',
}
