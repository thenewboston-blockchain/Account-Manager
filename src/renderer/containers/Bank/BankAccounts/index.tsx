import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      account_number: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      created_date: '2020-07-22T04:04:36.286467Z',
      id: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      modified_date: '2020-07-22T04:04:36.286498Z',
      trust: '0.00',
    },
  ],
  header: {
    account_number: 'Account Number',
    created_date: 'Created',
    id: 'ID',
    modified_date: 'Modified',
    trust: 'Trust',
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
