import axios from 'axios';

import {setValidatorConfig, setValidatorConfigError} from '@renderer/store/validators';
import {ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {NodeType} from '@renderer/types/api';

export const fetchValidatorConfig = (address: string) => async (dispatch: AppDispatch) => {
  try {
    const {data} = await axios.get<ValidatorConfig>(`${address}/config`);

    if (data.node_type !== NodeType.primaryValidator && data.node_type !== NodeType.confirmationValidator) {
      dispatch(setValidatorConfigError({address, error: 'Node not a validator'}));
      return;
    }

    dispatch(setValidatorConfig({address, data}));
    return data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setValidatorConfigError({address, error: error.response.data}));
  }
};
