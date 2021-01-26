import React, {FC, useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {VALIDATOR_ACCOUNTS} from '@renderer/constants/actions';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ValidatorAccount} from '@renderer/types';

enum TableKeys {
  accountNumber,
  balance,
  balanceLock,
}

const ValidatorAccounts: FC = () => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: validatorAccounts,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<ValidatorAccount>(VALIDATOR_ACCOUNTS, address);

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorAccounts.map((account) => ({
        key: account.id,
        [TableKeys.accountNumber]: <AccountLink accountNumber={account.account_number} />,
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
    <PaginatedTable
      className="ValidatorAccounts"
      count={count}
      currentPage={currentPage}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
};

export default ValidatorAccounts;
