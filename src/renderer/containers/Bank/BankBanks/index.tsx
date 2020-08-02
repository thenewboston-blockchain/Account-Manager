import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  id,
  nodeIdentifier,
  accountNumber,
  defaultTransactionFee,
  protocol,
  ipAddress,
  port,
  trust,
  version,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.accountNumber]: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
      [TableKeys.defaultTransactionFee]: '1.0000000000000000',
      [TableKeys.id]: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.ipAddress]: '167.99.173.247',
      [TableKeys.nodeIdentifier]: 'd5356888dc9303e44ce52b1e06c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1',
      [TableKeys.port]: '',
      [TableKeys.protocol]: 'http',
      [TableKeys.trust]: '100.00',
      [TableKeys.version]: 'v1.0',
    },
  ],
  headers: {
    [TableKeys.accountNumber]: 'Account Number',
    [TableKeys.defaultTransactionFee]: 'Default Tx Fee',
    [TableKeys.id]: 'ID',
    [TableKeys.ipAddress]: 'IP Address',
    [TableKeys.nodeIdentifier]: 'Network ID',
    [TableKeys.port]: 'Port',
    [TableKeys.protocol]: 'Protocol',
    [TableKeys.trust]: 'Trust',
    [TableKeys.version]: 'Version',
  },
  orderedKeys: [
    TableKeys.id,
    TableKeys.nodeIdentifier,
    TableKeys.accountNumber,
    TableKeys.defaultTransactionFee,
    TableKeys.protocol,
    TableKeys.ipAddress,
    TableKeys.port,
    TableKeys.trust,
    TableKeys.version,
  ],
};

const BankBanks: FC = () => {
  return (
    <div className="BankBanks">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankBanks;
