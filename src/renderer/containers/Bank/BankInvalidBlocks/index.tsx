import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.blockIdentifier]: 'e869520c62fe84421329086e03d91a68acdb0cdd4ba04456ca169baca3d66eac',
      [TableKeys.block]: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.id]: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.validator]: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    },
    {
      key: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.blockIdentifier]: 'c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1d5356888dc9303e44ce52b1e06',
      [TableKeys.block]: '876bc269-3d6c-44a1-8afb-171a41341247',
      [TableKeys.id]: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.validator]: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    },
  ],
  headers: {
    [TableKeys.blockIdentifier]: 'Block Identifier',
    [TableKeys.block]: 'Block',
    [TableKeys.id]: 'ID',
    [TableKeys.validator]: 'Validator',
  },
  orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.blockIdentifier, TableKeys.validator],
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
