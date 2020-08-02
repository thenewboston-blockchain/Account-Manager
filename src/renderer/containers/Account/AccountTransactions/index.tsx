import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable, {PageTableData} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {ActiveBank} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

const AccountTransactionsSelector = ({
  app: {activeBank},
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
      const tableData = data.results.map((bankTransaction: any) => ({
        amount: bankTransaction.amount,
        balance_key: bankTransaction.block.balance_key,
        date_created: bankTransaction.block.created_date,
        id: bankTransaction.id,
        recipient_account_number: bankTransaction.recipient,
        sender_account_number: bankTransaction.block.sender,
        signature: bankTransaction.block.signature,
      }));
      setBankTransactions(tableData);
    };

    fetchData();
  }, [accountNumber, activeBank]);

  return (
    <div className="AccountTransactions">
      <PageTable
        items={{
          data: bankTransactions,
          header: {
            amount: 'Amount',
            balance_key: 'Balance Key',
            date_created: 'Date Created',
            recipient_account_number: 'Recipient Account Number',
            sender_account_number: 'Sender Account Number',
            signature: 'Signature',
          },
        }}
      />
      <Pagination />
    </div>
  );
};

export default AccountTransactions;
