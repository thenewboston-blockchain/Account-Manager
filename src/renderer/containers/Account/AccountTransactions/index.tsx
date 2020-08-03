import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable, {PageTableData} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {ActiveBank} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

enum TableKeys {
  senderAccountNumber,
  recipientAccountNumber,
  amount,
  balanceKey,
  signature,
  dateCreated,
}

const AccountTransactionsSelector = ({
  session: {activeBank},
}: RootState): {
  activeBank: ActiveBank | null;
} => ({
  activeBank: activeBank.entities,
});

const AccountTransactions: FC = () => {
  const {accountNumber} = useParams();
  const {activeBank} = useSelector(AccountTransactionsSelector);
  const [bankTransactions, setBankTransactions] = useState<PageTableData[]>([]);

  useEffect(() => {
    if (!activeBank) return;

    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = activeBank;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/bank_transactions`, {
        params: {
          account_number: accountNumber,
        },
      });
      const tableData = data.results.map(
        (bankTransaction: any) =>
          ({
            key: bankTransaction.id,
            [TableKeys.amount]: bankTransaction.amount,
            [TableKeys.balanceKey]: bankTransaction.block.balance_key,
            [TableKeys.dateCreated]: bankTransaction.block.created_date,
            [TableKeys.recipientAccountNumber]: bankTransaction.recipient,
            [TableKeys.senderAccountNumber]: bankTransaction.block.sender,
            [TableKeys.signature]: bankTransaction.block.signature,
          } as PageTableData),
      );
      setBankTransactions(tableData);
    };

    fetchData();
  }, [accountNumber, activeBank]);

  return (
    <div className="AccountTransactions">
      <PageTable
        items={{
          data: bankTransactions,
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
        }}
      />
      <Pagination />
    </div>
  );
};

export default AccountTransactions;
