import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const BankValidators = () => {
  return (
    <div className="BankValidators">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankValidators;
