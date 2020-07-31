import React, {FC} from 'react';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

const sampleData = {
  data: [
    {
      created_date: '2020-07-09T22:10:35.312956Z',
      end: '2020-08-09T22:10:24Z',
      id: 'be9fbc3b-d4df-43d5-9bea-9882a6dd27f6',
      modified_date: '2020-07-09T22:10:37.393578Z',
      start: '2020-07-09T22:10:25Z',
      validator: '51461a75-dd8d-4133-81f4-543a3b054149',
    },
    {
      created_date: '2020-07-09T22:10:35.312956Z',
      end: '2020-08-09T22:10:24Z',
      id: 'e2055637-67ff-4479-aec6-a8095d513862',
      modified_date: '2020-07-09T22:10:37.393578Z',
      start: '2020-07-09T22:10:25Z',
      validator: '10308b02-d577-484e-953c-0a2bdb5e3d83',
    },
  ],
  header: {
    created_date: 'Created',
    end: 'End',
    id: 'ID',
    modified_date: 'Modified',
    start: 'Start',
    validator: 'Validator',
  },
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
