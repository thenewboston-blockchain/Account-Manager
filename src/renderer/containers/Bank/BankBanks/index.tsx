/* eslint-disable sort-keys */

import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      id: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      node_identifier: 'd5356888dc9303e44ce52b1e06c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1',
      account_number: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
      default_transaction_fee: '1.0000000000000000',
      protocol: 'http',
      ip_address: '167.99.173.247',
      port: '-',
      trust: '100.00',
      version: 'v1.0',
    },
  ],
  header: {
    id: 'ID',
    node_identifier: 'Network ID',
    account_number: 'Account Number',
    default_transaction_fee: 'Default Tx Fee',
    protocol: 'Protocol',
    ip_address: 'IP Address',
    port: 'Port',
    trust: 'Trust',
    version: 'Version',
  },
};

const BankBanks: FC = () => {
  return (
    <div className="BankBanks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankBanks;
