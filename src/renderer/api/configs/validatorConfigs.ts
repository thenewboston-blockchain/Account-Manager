import axios from 'axios';

import {setActivePrimaryValidatorState} from '@renderer/store/app/activePrimaryValidator';
import {setValidatorConfig} from '@renderer/store/configs/validatorConfigs';
import {Network, ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch, RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

type Args = Network;

export const fetchValidatorConfig = (args: Args) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const baseUrl = formatAddress(args.ip_address, args.port, args.protocol);
  const {data} = await axios.get<ValidatorConfig>(`${baseUrl}/config`);

  const {node_identifier: nodeIdentifier} = data;
  if (!getState().app.activePrimaryValidator) {
    const activePrimaryValidatorData = {
      ...args,
      nickname: '',
      node_identifier: nodeIdentifier,
    };
    dispatch(setActivePrimaryValidatorState(activePrimaryValidatorData));
  }

  dispatch(setValidatorConfig(data));
};
