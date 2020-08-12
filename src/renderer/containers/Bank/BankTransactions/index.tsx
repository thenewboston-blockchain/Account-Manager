import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_BANK_TRANSACTIONS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getBankBankTransactions} from '@renderer/selectors';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
}

const BankTransactions: FC = () => {
  const loading = useNetworkDataFetcher(BANK_BANK_TRANSACTIONS);
  const bankAddress = useAddress();
  const bankBankTransactionsObject = useSelector(getBankBankTransactions);
  const bankBankTransactions = bankBankTransactionsObject[bankAddress];

  const bankBankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankBankTransactions?.results.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.block]: bankTransaction.block.id,
        [TableKeys.id]: bankTransaction.id,
        [TableKeys.recipient]: bankTransaction.recipient,
        [TableKeys.sender]: bankTransaction.block.sender,
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
          <Pagination />
        </>
      )}
    </div>
  );
};

export default BankTransactions;
