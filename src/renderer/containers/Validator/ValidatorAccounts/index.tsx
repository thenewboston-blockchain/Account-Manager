/* eslint-disable sort-keys */

import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable, {PageTableData} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

const ValidatorAccounts: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.network.validators.entities[nid]);
  const [accounts, setAccounts] = useState<PageTableData[]>([]);

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
          data: accounts,
          header: {
            account_number: 'Account Number',
            balance: 'Balance',
            balance_lock: 'Balance Lock',
          },
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorAccounts;
