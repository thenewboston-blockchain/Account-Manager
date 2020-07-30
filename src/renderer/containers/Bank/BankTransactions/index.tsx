import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const BankTransactions = (): JSX.Element => {
  return (
    <div className="BankTransactions">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankTransactions;
