import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      balance_key: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      created_date: '2020-07-24T04:08:46.044868Z',
      id: '5b45dd48-94e4-4a7a-bbe0-4358024b1c70',
      modified_date: '2020-07-24T04:08:46.044917Z',
      sender: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      signature:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
    },
    {
      balance_key: '87b124d42120ff334fa2179505a9b2a4b43ce0dbcec239bf78fa7b5ff2b54321',
      created_date: '2020-07-24T04:09:48.124258Z',
      id: '876bc269-3d6c-44a1-8afb-171a41341247',
      modified_date: '2020-07-24T04:09:48.124298Z',
      sender: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      signature:
        '78282eed14026f0bdb93ef5e570909c476c07a900b5927b2813ef88bd35b9298b0ccec8f8ba729e797a5b96747f9d7196112f2bb8955d3e0f8c3c14b6c82f20a',
    },
  ],
  header: {
    balance_key: 'Balance Key',
    created_date: 'Created',
    id: 'ID',
    modified_date: 'Modified',
    sender: 'Sender',
    signature: 'Signature',
  },
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
