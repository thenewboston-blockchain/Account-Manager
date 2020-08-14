import React, {FC, useMemo} from 'react';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {VALIDATOR_ACCOUNTS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ValidatorAccount} from '@renderer/types';

enum TableKeys {
  accountNumber,
  balance,
  balanceLock,
}

const ValidatorAccounts: FC = () => {
  const {currentPage, loading, results: validatorAccounts, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    ValidatorAccount
  >(VALIDATOR_ACCOUNTS);

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorAccounts.map((account) => ({
        key: account.id,
        [TableKeys.accountNumber]: account.account_number,
        [TableKeys.balanceLock]: account.balance_lock,
        [TableKeys.balance]: account.balance,
      })) || [],
    [validatorAccounts],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.balanceLock]: 'Balance Lock',
        [TableKeys.balance]: 'Balance',
      },
      orderedKeys: [TableKeys.accountNumber, TableKeys.balance, TableKeys.balanceLock],
    }),
    [validatorAccountsTableData],
  );

  return (
    <div className="ValidatorAccounts">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTable items={pageTableItems} />
          <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default ValidatorAccounts;
