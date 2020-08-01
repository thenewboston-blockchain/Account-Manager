/* eslint-disable sort-keys */

import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      account_number: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
      daily_confirmation_rate: '-',
      default_transaction_fee: '4.0000000000000000',
      id: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      ip_address: '64.225.47.205',
      node_identifier: '3afdf37573f1a511def0bd85553404b7091a76bcd79cdcebba1310527b167521',
      port: '-',
      protocol: 'http',
      root_account_file:
        'https://gist.githubusercontent.com/buckyroberts/519b5cb82a0a5b5d4ae8a2175b722520/raw/9237deb449e27cab93cb89ea3346ecdfc61fe9ea/0.json',
      root_account_file_hash: '4694e1ee1dcfd8ee5f989e59ae40a9f751812bf5ca52aca2766b322c4060672b',
      seed_block_identifier: '-',
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
    daily_confirmation_rate: 'Daily Confirmation Rate',
    root_account_file: 'Root Account File',
    root_account_file_hash: 'Root Account File Hash',
    seed_block_identifier: 'Seed Block Identifier',
    trust: 'Trust',
    version: 'Version',
  },
};

const BankValidators: FC = () => {
  return (
    <div className="BankValidators">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankValidators;
