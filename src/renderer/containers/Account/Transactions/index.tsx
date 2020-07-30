import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import transactionSampleData from '@renderer/mock/TransactionSampleData';

const Transactions = () => {
  return (
    <div className="Transactions">
      <PageTable items={transactionSampleData} />
      <Pagination />
    </div>
  );
};

export default Transactions;
