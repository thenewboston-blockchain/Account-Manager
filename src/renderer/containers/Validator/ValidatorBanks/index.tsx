/* eslint-disable sort-keys */

import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable, {PageTableData} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

const ValidatorBanks: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.network.validators.entities[nid]);
  const [banks, setBanks] = useState<PageTableData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/banks`);
      const tableData = data.map((bank: any) => ({
        ...bank,
        id: bank.node_identifier,
      }));
      setBanks(tableData);
    };
    fetchData();
  }, [networkValidator]);

  return (
    <div className="ValidatorBanks">
      <PageTable
        items={{
          data: banks,
          header: {
            node_identifier: 'NID',
            account_number: 'Account Number',
            ip_address: 'IP Address',
            port: 'Port',
            protocol: 'Protocol',
            version: 'Version',
            default_transaction_fee: 'Transaction Fee',
            confirmation_expiration: 'Confirmation Expiration',
            trust: 'Trust',
          },
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorBanks;
