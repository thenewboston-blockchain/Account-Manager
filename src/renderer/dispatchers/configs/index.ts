import axios from 'axios';

import {setBankConfig, setValidatorConfig} from '@renderer/store/configs';
import {BankConfig, Network, ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchBankConfig = (network: Network) => async (dispatch: AppDispatch) => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<BankConfig>(`${baseUrl}/config`);
  dispatch(setBankConfig(data));
  return data;
};

export const fetchValidatorConfig = (network: Network) => async (dispatch: AppDispatch) => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<ValidatorConfig>(`${baseUrl}/config`);
  dispatch(setValidatorConfig(data));
  return data;
};
