import axios from 'axios';

import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import {setActiveBankState} from '@renderer/store/app/activeBank';
import {setBankConfig} from '@renderer/store/configs/bankConfigs';
import {BankConfig, Network} from '@renderer/types/entities';
import {AppDispatch, RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

type Args = Network & {
  nickname?: string;
};

export const fetchBankConfig = (args: Args) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const baseUrl = formatAddress(args.ip_address, args.port, args.protocol);
  const {data} = await axios.get<BankConfig>(`${baseUrl}/config`);

  dispatch(setBankConfig(data));

  const {node_identifier: nodeIdentifier, primary_validator: primaryValidator} = data;
  if (!getState().app.activeBank) {
    const activeBankData = {
      ...args,
      nickname: args.nickname || '',
      node_identifier: nodeIdentifier,
    };
    dispatch(setActiveBankState(activeBankData));
  }

  const primaryValidatorData = {
    ip_address: primaryValidator.ip_address,
    port: primaryValidator.port,
    protocol: primaryValidator.protocol,
  };
  dispatch(fetchValidatorConfig(primaryValidatorData));
};
