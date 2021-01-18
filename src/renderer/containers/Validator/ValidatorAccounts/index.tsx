import React, {FC, useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {VALIDATOR_ACCOUNTS} from '@renderer/constants';
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
    <div className="ValidatorAccounts">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ValidatorAccounts;
