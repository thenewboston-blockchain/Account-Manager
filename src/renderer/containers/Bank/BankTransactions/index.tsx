import React, {FC, useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_BANK_TRANSACTIONS} from '@renderer/constants/actions';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankTransaction} from '@renderer/types';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
}

const BankTransactions: FC = () => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: bankBankTransactions,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BankTransaction>(BANK_BANK_TRANSACTIONS, address);

  const bankBankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankBankTransactions.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.block]: bankTransaction.block.id,
        [TableKeys.id]: bankTransaction.id,
        [TableKeys.recipient]: <AccountLink accountNumber={bankTransaction.recipient} />,
        [TableKeys.sender]: <AccountLink accountNumber={bankTransaction.block.sender} />,
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
    <PaginatedTable
      className="BankTransactions"
      count={count}
      currentPage={currentPage}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
};

export default BankTransactions;
