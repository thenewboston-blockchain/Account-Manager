import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  BANK_ACCOUNTS,
  BANK_BANKS,
  BANK_BANK_TRANSACTIONS,
  BANK_BLOCKS,
  BANK_CONFIGS,
  BANK_CONFIRMATION_BLOCKS,
  BANK_INVALID_BLOCKS,
  BANK_VALIDATORS,
  BANK_VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATOR_ACCOUNTS,
  VALIDATOR_BANKS,
  VALIDATOR_CONFIGS,
  VALIDATOR_VALIDATORS,
} from '@renderer/constants';
import {
  fetchBankAccounts,
  fetchBankBanks,
  fetchBankBankTransactions,
  fetchBankBlocks,
  fetchBankConfirmationBlocks,
  fetchBankInvalidBlocks,
  fetchBankValidatorConfirmationServices,
  fetchBankValidators,
} from '@renderer/dispatchers/banks';
import {fetchValidatorAccounts, fetchValidatorBanks, fetchValidatorValidators} from '@renderer/dispatchers/validators';
import {
  getBankAccounts,
  getBankBanks,
  getBankBankTransactions,
  getBankBlocks,
  getBankConfirmationBlocks,
  getBankInvalidBlocks,
  getBankValidatorConfirmationServices,
  getBankValidators,
  getValidatorAccounts,
  getValidatorBanks,
  getValidatorValidators,
} from '@renderer/selectors';
import {
  unsetBankAccounts,
  unsetBankBanks,
  unsetBankBankTransactions,
  unsetBankBlocks,
  unsetBankConfirmationBlocks,
  unsetBankInvalidBlocks,
  unsetBankValidatorConfirmationServices,
  unsetBankValidators,
} from '@renderer/store/banks';
import {unsetValidatorAccounts, unsetValidatorBanks, unsetValidatorValidators} from '@renderer/store/validators';
import {
  AppDispatch,
  DictWithPaginatedResultsAndError,
  PaginatedQueryParams,
  PaginatedResultsWithError,
  RootState,
} from '@renderer/types';
import {parseQueryParams} from '@renderer/utils/address';

import useAddress from './useAddress';

const getDispatcherFromType = (
  type: string,
): ((address: string, params: PaginatedQueryParams) => (dispatch: AppDispatch) => Promise<any>) => {
  switch (type) {
    case BANK_ACCOUNTS:
      return fetchBankAccounts;
    case BANK_BANKS:
      return fetchBankBanks;
    case BANK_BANK_TRANSACTIONS:
      return fetchBankBankTransactions;
    case BANK_BLOCKS:
      return fetchBankBlocks;
    case BANK_CONFIRMATION_BLOCKS:
      return fetchBankConfirmationBlocks;
    case BANK_INVALID_BLOCKS:
      return fetchBankInvalidBlocks;
    case BANK_VALIDATORS:
      return fetchBankValidators;
    case BANK_VALIDATOR_CONFIRMATION_SERVICES:
      return fetchBankValidatorConfirmationServices;
    case VALIDATOR_ACCOUNTS:
      return fetchValidatorAccounts;
    case VALIDATOR_BANKS:
      return fetchValidatorBanks;
    case VALIDATOR_VALIDATORS:
      return fetchValidatorValidators;
    default:
      throw new Error();
  }
};

type PaginatedSelector<T> = (state: RootState) => DictWithPaginatedResultsAndError<T>;

function getSelectorFromType<T>(type: string): PaginatedSelector<T> {
  switch (type) {
    case BANK_ACCOUNTS:
      return (getBankAccounts as unknown) as PaginatedSelector<T>;
    case BANK_BANKS:
      return (getBankBanks as unknown) as PaginatedSelector<T>;
    case BANK_BANK_TRANSACTIONS:
      return (getBankBankTransactions as unknown) as PaginatedSelector<T>;
    case BANK_BLOCKS:
      return (getBankBlocks as unknown) as PaginatedSelector<T>;
    case BANK_CONFIRMATION_BLOCKS:
      return (getBankConfirmationBlocks as unknown) as PaginatedSelector<T>;
    case BANK_INVALID_BLOCKS:
      return (getBankInvalidBlocks as unknown) as PaginatedSelector<T>;
    case BANK_VALIDATORS:
      return (getBankValidators as unknown) as PaginatedSelector<T>;
    case BANK_VALIDATOR_CONFIRMATION_SERVICES:
      return (getBankValidatorConfirmationServices as unknown) as PaginatedSelector<T>;
    case VALIDATOR_ACCOUNTS:
      return (getValidatorAccounts as unknown) as PaginatedSelector<T>;
    case VALIDATOR_BANKS:
      return (getValidatorBanks as unknown) as PaginatedSelector<T>;
    case VALIDATOR_VALIDATORS:
      return (getValidatorValidators as unknown) as PaginatedSelector<T>;
    default:
      throw new Error();
  }
}

const getUnsetActionCreatorFromType = (type: string) => {
  switch (type) {
    case BANK_ACCOUNTS:
      return unsetBankAccounts;
    case BANK_BANKS:
      return unsetBankBanks;
    case BANK_BANK_TRANSACTIONS:
      return unsetBankBankTransactions;
    case BANK_BLOCKS:
      return unsetBankBlocks;
    case BANK_CONFIRMATION_BLOCKS:
      return unsetBankConfirmationBlocks;
    case BANK_INVALID_BLOCKS:
      return unsetBankInvalidBlocks;
    case BANK_VALIDATORS:
      return unsetBankValidators;
    case BANK_VALIDATOR_CONFIRMATION_SERVICES:
      return unsetBankValidatorConfirmationServices;
    case VALIDATOR_ACCOUNTS:
      return unsetValidatorAccounts;
    case VALIDATOR_BANKS:
      return unsetValidatorBanks;
    case VALIDATOR_VALIDATORS:
      return unsetValidatorValidators;
    default:
      throw new Error();
  }
};

function usePaginatedNetworkDataFetcher<T>(
  type: string,
): {
  // currentPage: number;
  data: PaginatedResultsWithError<T>;
  fetchNextResults: () => void;
  fetchPreviousResults: () => void;
  loading: boolean;
  // totalPages: number;
} {
  // const [currentPage, setCurrentPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [queryParams, setQueryParams] = useState<PaginatedQueryParams>({});
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const paginatedResultsDataObject = useSelector(getSelectorFromType<T>(type));
  const paginatedResultsData = paginatedResultsDataObject[address];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(getDispatcherFromType(type)(address, queryParams));
      setLoading(false);
    };

    fetchData();

    return () => {
      if (type !== BANK_CONFIGS && type !== VALIDATOR_CONFIGS) {
        dispatch(getUnsetActionCreatorFromType(type)({address}));
      }
    };
  }, [address, dispatch, queryParams, type]);

  const fetchNextResults = (): void => {
    if (!paginatedResultsData?.next) return;

    setQueryParams(parseQueryParams(paginatedResultsData.next) as PaginatedQueryParams);
  };

  const fetchPreviousResults = (): void => {
    if (!paginatedResultsData?.previous) return;

    setQueryParams(parseQueryParams(paginatedResultsData.previous) as PaginatedQueryParams);
  };

  // const totalPages = useMemo<number>(() => {
  //   if (!paginatedResultsData?.count) {
  //     return 1;
  //   }
  //
  //   return Math.floor(paginatedResultsData.count);
  // }, [paginatedResultsData]);

  return {data: paginatedResultsData, fetchNextResults, fetchPreviousResults, loading};
}

export default usePaginatedNetworkDataFetcher;
