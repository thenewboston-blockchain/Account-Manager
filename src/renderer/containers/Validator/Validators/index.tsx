import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const Validators = () => {
  return (
    <div className="Validators">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default Validators;
