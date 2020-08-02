import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: '002b0e1e-403d-4430-8100-99dc475e5d49',
      [TableKeys.amount]: '5.5000000000000000',
      [TableKeys.block]:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
      [TableKeys.id]: '002b0e1e-403d-4430-8100-99dc475e5d49',
      [TableKeys.recipient]: '484b3176c63d5f37d808404af1a12c4b9649cd6f6769f35bdf5a816133623fbc',
      [TableKeys.sender]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    },
    {
      key: '267ef1c8-9cdc-49e2-8625-a5592f849917',
      [TableKeys.amount]: '1.0000000000000000',
      [TableKeys.block]:
        'a074d021451afed6277b12b10cd522d72f4c19158e3189b54a7d44b429a534fbee4e85ecbda853f94b53a15d435273c85b3185ef2c7ac0c3e486f16dbbe8fa03',
      [TableKeys.id]: '267ef1c8-9cdc-49e2-8625-a5592f849917',
      [TableKeys.recipient]: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
      [TableKeys.sender]: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    },
  ],
  headers: {
    [TableKeys.amount]: 'Amount',
    [TableKeys.block]: 'Block',
    [TableKeys.id]: 'ID',
    [TableKeys.recipient]: 'Recipient',
    [TableKeys.sender]: 'Sender',
  },
  orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.sender, TableKeys.recipient, TableKeys.amount],
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
