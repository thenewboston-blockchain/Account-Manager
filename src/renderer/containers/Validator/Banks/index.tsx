import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const Banks = () => {
  return (
    <div className="Banks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default Banks;
