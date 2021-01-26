import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';

import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';
import {
  BANK_ACCOUNTS,
  BANK_BANK_TRANSACTIONS,
  BANK_BANKS,
  BANK_BLOCKS,
  BANK_CONFIGS,
  BANK_CONFIRMATION_BLOCKS,
  BANK_INVALID_BLOCKS,
  BANK_VALIDATOR_CONFIRMATION_SERVICES,
  BANK_VALIDATORS,
  VALIDATOR_ACCOUNTS,
  VALIDATOR_BANKS,
  VALIDATOR_CONFIGS,
  VALIDATOR_VALIDATORS,
} from '@renderer/constants/actions';
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
import {AppDispatch, DictWithPaginatedResultsAndError, PaginatedQueryParams, RootState} from '@renderer/types';

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

interface QueryParams {
  [param: string]: any;
}

function usePaginatedNetworkDataFetcher<T>(
  type: string,
  address: string,
  queryParams: QueryParams = {},
): {
  count: number;
  currentPage: number;
  error: string | null;
  loading: boolean;
  results: T[];
  setPage(page: number): () => void;
  totalPages: number;
} {
  const [count, setCount] = useState<number>(0);
  const [currentAddress, setCurrentAddress] = useState<string>(address);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [memoizedQueryParams, setMemoizedQueryParams] = useState<QueryParams>(queryParams);
  const [totalPages, setTotalPages] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const paginatedResultsDataObject = useSelector(getSelectorFromType<T>(type));
  const paginatedResultsData = paginatedResultsDataObject[currentAddress];

  useEffect(() => {
    if (!isEqual(memoizedQueryParams, queryParams)) {
      setMemoizedQueryParams(queryParams);
    }
  }, [memoizedQueryParams, queryParams]);

  useEffect(() => {
    if (address !== currentAddress) {
      setCurrentAddress(address);
      setCurrentPage(1);
    }
  }, [address, currentAddress]);

  useEffect(() => {
    if (paginatedResultsData) {
      setCount(paginatedResultsData.count);
      setTotalPages(Math.ceil(paginatedResultsData.count / PAGINATED_RESULTS_LIMIT));
    }
  }, [paginatedResultsData]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      const paginatedQueryParams: PaginatedQueryParams = {
        limit: PAGINATED_RESULTS_LIMIT,
        offset: (currentPage - 1) * PAGINATED_RESULTS_LIMIT,
      };
      await dispatch(getDispatcherFromType(type)(currentAddress, {...memoizedQueryParams, ...paginatedQueryParams}));
      setLoading(false);
    };

    fetchData();

    return () => {
      if (type !== BANK_CONFIGS && type !== VALIDATOR_CONFIGS) {
        dispatch(getUnsetActionCreatorFromType(type)({address: currentAddress}));
      }
    };
  }, [currentAddress, currentPage, dispatch, memoizedQueryParams, type]);

  const setPage = useCallback(
    (page: number) => (): void => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [setCurrentPage, totalPages],
  );

  return {
    count,
    currentPage,
    error: paginatedResultsData?.error || null,
    loading,
    results: paginatedResultsData?.results || [],
    setPage,
    totalPages,
  };
}

export default usePaginatedNetworkDataFetcher;
