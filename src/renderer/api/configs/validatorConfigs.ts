import axios from 'axios';

import {setActivePrimaryValidatorState} from '@renderer/store/app/activePrimaryValidator';
import {setValidatorConfig} from '@renderer/store/configs/validatorConfigs';
import {Network, ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch, RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchValidatorConfig = (network: Network) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<ValidatorConfig>(`${baseUrl}/config`);

  const {node_identifier: nodeIdentifier} = data;
  if (!getState().app.activePrimaryValidator) {
    const activePrimaryValidatorData = {
      ...network,
      nickname: '',
      node_identifier: nodeIdentifier,
    };
    dispatch(setActivePrimaryValidatorState(activePrimaryValidatorData));
  }

  dispatch(setValidatorConfig(data));
};
