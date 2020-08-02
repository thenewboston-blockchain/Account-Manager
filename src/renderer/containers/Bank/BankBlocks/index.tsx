import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  id,
  balanceKey,
  sender,
  signature,
  createdDate,
  modifiedDate,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.balanceKey]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      [TableKeys.createdDate]: '2020-07-24T04:08:46.044868Z',
      [TableKeys.id]: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      [TableKeys.modifiedDate]: '2020-07-24T04:08:46.044917Z',
      [TableKeys.sender]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      [TableKeys.signature]:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
    },
    {
      key: '876bc269-3d6c-44a1-8afb-171a41341247',
      [TableKeys.balanceKey]: '87b124d42120ff334fa2179505a9b2a4b43ce0dbcec239bf78fa7b5ff2b54321',
      [TableKeys.createdDate]: '2020-07-24T04:09:48.124258Z',
      [TableKeys.id]: '876bc269-3d6c-44a1-8afb-171a41341247',
      [TableKeys.modifiedDate]: '2020-07-24T04:09:48.124298Z',
      [TableKeys.sender]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      [TableKeys.signature]:
        '78282eed14026f0bdb93ef5e570909c476c07a900b5927b2813ef88bd35b9298b0ccec8f8ba729e797a5b96747f9d7196112f2bb8955d3e0f8c3c14b6c82f20a',
    },
  ],
  headers: {
    [TableKeys.balanceKey]: 'Balance Key',
    [TableKeys.createdDate]: 'Created',
    [TableKeys.id]: 'ID',
    [TableKeys.modifiedDate]: 'Modified',
    [TableKeys.sender]: 'Sender',
    [TableKeys.signature]: 'Signature',
  },
  orderedKeys: [
    TableKeys.id,
    TableKeys.balanceKey,
    TableKeys.sender,
    TableKeys.signature,
    TableKeys.createdDate,
    TableKeys.modifiedDate,
  ],
};

const BankBlocks: FC = () => {
  return (
    <div className="BankBlocks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankBlocks;
