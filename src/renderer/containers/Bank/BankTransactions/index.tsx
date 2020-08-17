import React, {FC, useMemo} from 'react';

import AccountNumberLink from '@renderer/components/AccountNumberLink';
import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_BANK_TRANSACTIONS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankTransaction} from '@renderer/types';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
}

const BankTransactions: FC = () => {
  const {currentPage, loading, results: bankBankTransactions, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BankTransaction
  >(BANK_BANK_TRANSACTIONS);

  const bankBankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankBankTransactions.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.block]: bankTransaction.block.id,
        [TableKeys.id]: bankTransaction.id,
        [TableKeys.recipient]: <AccountNumberLink accountNumber={bankTransaction.recipient} />,
        [TableKeys.sender]: <AccountNumberLink accountNumber={bankTransaction.block.sender} />,
      })) || [],
    [bankBankTransactions],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBankTransactionsTableData,
      headers: {
        [TableKeys.amount]: 'Amount',
        [TableKeys.block]: 'Block',
        [TableKeys.id]: 'ID',
        [TableKeys.recipient]: 'Recipient',
        [TableKeys.sender]: 'Sender',
      },
      orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.sender, TableKeys.recipient, TableKeys.amount],
    }),
    [bankBankTransactionsTableData],
  );

  return (
    <div className="BankTransactions">
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

export default BankTransactions;
