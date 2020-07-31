import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      block: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      block_identifier: 'e869520c62fe84421329086e03d91a68acdb0cdd4ba04456ca169baca3d66eac',
      id: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      validator: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    },
    {
      block: '876bc269-3d6c-44a1-8afb-171a41341247',
      block_identifier: 'c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1d5356888dc9303e44ce52b1e06',
      id: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      validator: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    },
  ],
  header: {
    block: 'Block',
    block_identifier: 'Block Identifier',
    id: 'ID',
    validator: 'Validator',
  },
};

const BankInvalidBlocks: FC = () => {
  return (
    <div className="BankInvalidBlocks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankInvalidBlocks;
