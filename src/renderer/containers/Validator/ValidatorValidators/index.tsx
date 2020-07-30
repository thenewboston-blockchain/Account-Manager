import React from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const ValidatorValidators = () => {
  return (
    <div className="ValidatorValidators">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default ValidatorValidators;
