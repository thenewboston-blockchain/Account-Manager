import React, {FC, useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_BANK_TRANSACTIONS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankTransaction} from '@renderer/types';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
  memo,
}

const BankTransactions: FC = () => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
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
        [TableKeys.block]: <ExpandableText expanded={expanded} text={bankTransaction.block.id} />,
        [TableKeys.id]: <ExpandableText expanded={expanded} text={bankTransaction.id} />,
        [TableKeys.memo]: <ExpandableText expanded={expanded} text={bankTransaction.memo || '-'} />,
        [TableKeys.recipient]: <AccountLink accountNumber={bankTransaction.recipient} expanded={expanded} />,
        [TableKeys.sender]: <AccountLink accountNumber={bankTransaction.block.sender} expanded={expanded} />,
      })) || [],
    [bankBankTransactions, expanded],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBankTransactionsTableData,
      headers: {
        [TableKeys.amount]: 'Amount',
        [TableKeys.block]: 'Block',
        [TableKeys.id]: 'ID',
        [TableKeys.memo]: 'Memo',
        [TableKeys.recipient]: 'Recipient',
        [TableKeys.sender]: 'Sender',
      },
      orderedKeys: [
        TableKeys.id,
        TableKeys.block,
        TableKeys.sender,
        TableKeys.recipient,
        TableKeys.amount,
        TableKeys.memo,
      ],
    }),
    [bankBankTransactionsTableData],
  );

  return (
    <PaginatedTable
      className="BankTransactions"
      count={count}
      currentPage={currentPage}
      expanded={expanded}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      toggleExpanded={toggleExpanded}
      totalPages={totalPages}
    />
  );
};

export default BankTransactions;
