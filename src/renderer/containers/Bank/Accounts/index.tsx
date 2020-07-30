import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const Accounts = () => {
  return (
    <div className="Accounts">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default Accounts;
