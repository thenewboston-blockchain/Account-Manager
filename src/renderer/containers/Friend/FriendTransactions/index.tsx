import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import AccountLink from '@renderer/components/AccountLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_BANK_TRANSACTIONS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {getActiveBankConfig} from '@renderer/selectors';
import {BankTransaction} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {formatDate} from '@renderer/utils/dates';

enum TableKeys {
  senderAccountNumber,
  recipientAccountNumber,
  amount,
  balanceKey,
  signature,
  dateCreated,
}

const FriendTransactions: FC = () => {
  const {accountNumber} = useParams();
  const activeBank = useSelector(getActiveBankConfig)!;
  const activeBankAddress = formatAddressFromNode(activeBank);
  const {count, currentPage, loading, results: bankTransactions, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BankTransaction
  >(BANK_BANK_TRANSACTIONS, activeBankAddress, {account_number: accountNumber});

  const bankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankTransactions.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.balanceKey]: bankTransaction.block.balance_key,
        [TableKeys.dateCreated]: formatDate(bankTransaction.block.created_date),
        [TableKeys.recipientAccountNumber]: <AccountLink accountNumber={bankTransaction.recipient} />,
        [TableKeys.senderAccountNumber]: <AccountLink accountNumber={bankTransaction.block.sender} />,
        [TableKeys.signature]: bankTransaction.block.signature,
      })) || [],
    [bankTransactions],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankTransactionsTableData,
      headers: {
        [TableKeys.amount]: 'Amount',
        [TableKeys.balanceKey]: 'Balance Key',
        [TableKeys.dateCreated]: 'Date Created',
        [TableKeys.recipientAccountNumber]: 'Recipient Account Number',
        [TableKeys.senderAccountNumber]: 'Sender Account Number',
        [TableKeys.signature]: 'Signature',
      },
      orderedKeys: [
        TableKeys.senderAccountNumber,
        TableKeys.recipientAccountNumber,
        TableKeys.amount,
        TableKeys.balanceKey,
        TableKeys.signature,
        TableKeys.dateCreated,
      ],
    }),
    [bankTransactionsTableData],
  );

  return (
    <div className="FriendTransactions">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default FriendTransactions;
