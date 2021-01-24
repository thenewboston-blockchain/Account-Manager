import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {BANK_CONFIGS, VALIDATOR_CONFIGS} from '@renderer/constants/actions';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {fetchValidatorConfig} from '@renderer/dispatchers/validators';
import {getBankConfigs, getValidatorConfigs} from '@renderer/selectors';
import {AppDispatch, DictWithDataAndError, RootState} from '@renderer/types';

import useAddress from './useAddress';

type DataSelector<T> = (state: RootState) => DictWithDataAndError<T>;

function getSelectorFromType<T>(type: string): DataSelector<T> {
  switch (type) {
    case BANK_CONFIGS:
      return (getBankConfigs as unknown) as DataSelector<T>;
    case VALIDATOR_CONFIGS:
      return (getValidatorConfigs as unknown) as DataSelector<T>;
    default:
      throw new Error();
  }
}

const getDispatcherFromType = (type: string): ((address: string) => (dispatch: AppDispatch) => Promise<any>) => {
  switch (type) {
    case BANK_CONFIGS:
      return fetchBankConfig;
    case VALIDATOR_CONFIGS:
      return fetchValidatorConfig;
    default:
      throw new Error();
  }
};

function useNetworkConfigFetcher<T>(
  type: string,
): {
  error: string | null;
  loading: boolean;
  data: T | null;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const configObject = useSelector(getSelectorFromType<T>(type));
  const configData = configObject[address];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(getDispatcherFromType(type)(address));
      setLoading(false);
    };

    fetchData();
  }, [address, dispatch, type]);

  return {
    data: configData?.data || null,
    error: configData?.error || null,
    loading,
  };
}

export default useNetworkConfigFetcher;
