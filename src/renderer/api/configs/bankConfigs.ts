import axios from 'axios';

import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import {setActiveBankState} from '@renderer/store/app/activeBank';
import {setBankConfig} from '@renderer/store/configs/bankConfigs';
import {BankConfig, Network} from '@renderer/types/entities';
import {AppDispatch, RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchBankConfig = (network: Network, nickname = '') => async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<BankConfig>(`${baseUrl}/config`);

  const {node_identifier: nodeIdentifier, primary_validator: primaryValidator} = data;

  const primaryValidatorData = {
    ip_address: primaryValidator.ip_address,
    port: primaryValidator.port,
    protocol: primaryValidator.protocol,
  };
  await dispatch(fetchValidatorConfig(primaryValidatorData));

  if (!getState().app.activeBank) {
    const activeBankData = {
      ...network,
      nickname,
      node_identifier: nodeIdentifier,
    };
    dispatch(setActiveBankState(activeBankData));
  }

  dispatch(setBankConfig(data));
};
