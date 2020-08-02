import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  createdDate,
  end,
  id,
  modifiedDate,
  start,
  validator,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: 'be9fbc3b-d4df-43d5-9bea-9882a6dd27f6',
      [TableKeys.createdDate]: '2020-07-09T22:10:35.312956Z',
      [TableKeys.end]: '2020-08-09T22:10:24Z',
      [TableKeys.id]: 'be9fbc3b-d4df-43d5-9bea-9882a6dd27f6',
      [TableKeys.modifiedDate]: '2020-07-09T22:10:37.393578Z',
      [TableKeys.start]: '2020-07-09T22:10:25Z',
      [TableKeys.validator]: '51461a75-dd8d-4133-81f4-543a3b054149',
    },
    {
      key: 'e2055637-67ff-4479-aec6-a8095d513862',
      [TableKeys.createdDate]: '2020-07-09T22:10:35.312956Z',
      [TableKeys.end]: '2020-08-09T22:10:24Z',
      [TableKeys.id]: 'e2055637-67ff-4479-aec6-a8095d513862',
      [TableKeys.modifiedDate]: '2020-07-09T22:10:37.393578Z',
      [TableKeys.start]: '2020-07-09T22:10:25Z',
      [TableKeys.validator]: '10308b02-d577-484e-953c-0a2bdb5e3d83',
    },
  ],
  headers: {
    [TableKeys.createdDate]: 'Created',
    [TableKeys.end]: 'End',
    [TableKeys.id]: 'ID',
    [TableKeys.modifiedDate]: 'Modified',
    [TableKeys.start]: 'Start',
    [TableKeys.validator]: 'Validator',
  },
  orderedKeys: [
    TableKeys.createdDate,
    TableKeys.end,
    TableKeys.id,
    TableKeys.modifiedDate,
    TableKeys.start,
    TableKeys.validator,
  ],
};

const BankValidatorConfirmationServices: FC = () => {
  return (
    <div className="BankValidatorConfirmationServices">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankValidatorConfirmationServices;
