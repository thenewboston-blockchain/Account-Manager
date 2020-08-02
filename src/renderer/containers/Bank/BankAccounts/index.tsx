import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  id,
  accountNumber,
  trust,
  createdDate,
  modifiedDate,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.accountNumber]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      [TableKeys.createdDate]: '2020-07-22T04:04:36.286467Z',
      [TableKeys.id]: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.modifiedDate]: '2020-07-22T04:04:36.286498Z',
      [TableKeys.trust]: '0.00',
    },
  ],
  headers: {
    [TableKeys.accountNumber]: 'Account Number',
    [TableKeys.createdDate]: 'Created',
    [TableKeys.id]: 'ID',
    [TableKeys.modifiedDate]: 'Modified',
    [TableKeys.trust]: 'Trust',
  },
  orderedKeys: [TableKeys.id, TableKeys.accountNumber, TableKeys.trust, TableKeys.createdDate, TableKeys.modifiedDate],
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
