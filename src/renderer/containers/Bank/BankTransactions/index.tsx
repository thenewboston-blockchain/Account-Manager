/* eslint-disable sort-keys */

import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      id: '002b0e1e-403d-4430-8100-99dc475e5d49',
      block:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
      sender: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      recipient: '484b3176c63d5f37d808404af1a12c4b9649cd6f6769f35bdf5a816133623fbc',
      amount: '5.5000000000000000',
    },
    {
      id: '267ef1c8-9cdc-49e2-8625-a5592f849917',
      block:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
      sender: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
      recipient: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
      amount: '1.0000000000000000',
    },
  ],
  header: {
    id: 'ID',
    block: 'Block',
    sender: 'Sender',
    recipient: 'Recipient',
    amount: 'Amount',
  },
};

const BankTransactions: FC = () => {
  return (
    <div className="BankTransactions">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankTransactions;
