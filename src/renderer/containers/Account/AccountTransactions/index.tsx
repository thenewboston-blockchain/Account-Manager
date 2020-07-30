import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import transactionSampleData from '@renderer/mock/TransactionSampleData';

const AccountTransactions = () => {
  return (
    <div className="AccountTransactions">
      <PageTable items={transactionSampleData} />
      <Pagination />
    </div>
  );
};

export default AccountTransactions;
