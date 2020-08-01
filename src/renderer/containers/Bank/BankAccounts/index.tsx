/* eslint-disable sort-keys */

import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      id: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      account_number: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      trust: '0.00',
      created_date: '2020-07-22T04:04:36.286467Z',
      modified_date: '2020-07-22T04:04:36.286498Z',
    },
  ],
  header: {
    id: 'ID',
    account_number: 'Account Number',
    trust: 'Trust',
    created_date: 'Created',
    modified_date: 'Modified',
  },
};

const BankAccounts: FC = () => {
  return (
    <div className="BankAccounts">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankAccounts;
