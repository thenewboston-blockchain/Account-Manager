import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const Transactions = () => {
  return (
    <div className="Transactions">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default Transactions;
