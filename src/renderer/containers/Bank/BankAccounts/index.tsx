import React, {FC, useMemo} from 'react';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_ACCOUNTS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankAccount} from '@renderer/types';

enum TableKeys {
  id,
  accountNumber,
  trust,
  createdDate,
  modifiedDate,
}

const BankAccounts: FC = () => {
  const {currentPage, loading, results: bankAccounts, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BankAccount
  >(BANK_ACCOUNTS);

  const bankAccountsTableData = useMemo<PageTableData[]>(
    () =>
      bankAccounts.map((account) => ({
        key: account.account_number,
        [TableKeys.accountNumber]: account.account_number,
        [TableKeys.createdDate]: account.created_date,
        [TableKeys.id]: account.id,
        [TableKeys.modifiedDate]: account.modified_date,
        [TableKeys.trust]: account.trust,
      })) || [],
    [bankAccounts],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.createdDate]: 'Created',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.trust]: 'Trust',
      },
      orderedKeys: [
        TableKeys.id,
        TableKeys.accountNumber,
        TableKeys.trust,
        TableKeys.createdDate,
        TableKeys.modifiedDate,
      ],
    }),
    [bankAccountsTableData],
  );

  return (
    <div className="BankAccounts">
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

export default BankAccounts;
