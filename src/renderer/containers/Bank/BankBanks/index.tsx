import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

import sampleData from '@renderer/mock/OverviewSampleData';

const BankBanks: FC = () => {
  return (
    <div className="BankBanks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankBanks;
