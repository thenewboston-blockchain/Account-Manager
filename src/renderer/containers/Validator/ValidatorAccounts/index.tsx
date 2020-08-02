import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {Account} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

enum TableKeys {
  accountNumber,
  balance,
  balanceLock,
}

const ValidatorAccounts: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.network.validators.entities[nid]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/accounts`);
      setAccounts(data);
    };

    fetchData();
  }, [networkValidator]);

  return (
    <div className="ValidatorAccounts">
      <PageTable
        items={{
          data: accounts.map((account) => ({
            key: account.account_number,
            [TableKeys.accountNumber]: account.account_number,
            [TableKeys.balanceLock]: account.balance_lock,
            [TableKeys.balance]: account.balance,
          })),
          headers: {
            [TableKeys.accountNumber]: 'Account Number',
            [TableKeys.balanceLock]: 'Balance Lock',
            [TableKeys.balance]: 'Balance',
          },
          orderedKeys: [TableKeys.accountNumber, TableKeys.balance, TableKeys.balanceLock],
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorAccounts;
