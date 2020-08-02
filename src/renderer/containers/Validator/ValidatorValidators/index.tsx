/* eslint-disable sort-keys */

import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable, {PageTableData} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

const ValidatorValidators: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.network.validators.entities[nid]);
  const [validators, setValidators] = useState<PageTableData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/validators`);
      const tableData = data.map((validator: any) => ({
        ...validator,
        id: validator.node_identifier,
      }));
      setValidators(tableData);
    };

    fetchData();
  }, [networkValidator]);

  return (
    <div className="ValidatorValidators">
      <PageTable
        items={{
          data: validators,
          header: {
            node_identifier: 'NID',
            account_number: 'Account Number',
            ip_address: 'IP Address',
            port: 'Port',
            protocol: 'Protocol',
            version: 'Version',
            default_transaction_fee: 'Transaction Fee',
            root_account_file: 'Root Account File',
            root_account_file_hash: 'Root Account File Hash',
            seed_block_identifier: 'Seed Block',
            daily_confirmation_rate: 'Daily Confirmation Rate',
            trust: 'Trust',
          },
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorValidators;
