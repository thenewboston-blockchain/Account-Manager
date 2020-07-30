import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const ValidatorAccounts: FC = () => {
  return (
    <div className="ValidatorAccounts">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default ValidatorAccounts;
