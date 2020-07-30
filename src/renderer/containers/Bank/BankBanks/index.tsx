import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const BankBanks = (): JSX.Element => {
  return (
    <div className="BankBanks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankBanks;
