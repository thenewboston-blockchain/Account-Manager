import React, {FC} from 'react';

import PageTable, {PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  accountNumber,
  dailyConfirmationRate,
  defaultTransactionFee,
  id,
  ipAddress,
  nodeIdentifier,
  port,
  protocol,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  trust,
  version,
}

const sampleData: PageTableItems = {
  data: [
    {
      key: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.accountNumber]: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
      [TableKeys.dailyConfirmationRate]: '-',
      [TableKeys.defaultTransactionFee]: '4.0000000000000000',
      [TableKeys.id]: 'd99d2349-3ee5-4bd9-a285-0d3e8f8a63b9',
      [TableKeys.ipAddress]: '64.225.47.205',
      [TableKeys.nodeIdentifier]: '3afdf37573f1a511def0bd85553404b7091a76bcd79cdcebba1310527b167521',
      [TableKeys.port]: '-',
      [TableKeys.protocol]: 'http',
      [TableKeys.rootAccountFileHash]: '4694e1ee1dcfd8ee5f989e59ae40a9f751812bf5ca52aca2766b322c4060672b',
      [TableKeys.rootAccountFile]:
        'https://gist.githubusercontent.com/buckyroberts/519b5cb82a0a5b5d4ae8a2175b722520/raw/9237deb449e27cab93cb89ea3346ecdfc61fe9ea/0.json',
      [TableKeys.seedBlockIdentifier]: '-',
      [TableKeys.trust]: '100.00',
      [TableKeys.version]: 'v1.0',
    },
  ],
  headers: {
    [TableKeys.id]: 'ID',
    [TableKeys.accountNumber]: 'Account Number',
    [TableKeys.dailyConfirmationRate]: 'Daily Confirmation Rate',
    [TableKeys.defaultTransactionFee]: 'Default Tx Fee',
    [TableKeys.ipAddress]: 'IP Address',
    [TableKeys.nodeIdentifier]: 'Network ID',
    [TableKeys.port]: 'Port',
    [TableKeys.protocol]: 'Protocol',
    [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
    [TableKeys.rootAccountFile]: 'Root Account File',
    [TableKeys.seedBlockIdentifier]: 'Seed Block Identifier',
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
    TableKeys.dailyConfirmationRate,
    TableKeys.rootAccountFile,
    TableKeys.rootAccountFileHash,
    TableKeys.seedBlockIdentifier,
    TableKeys.trust,
    TableKeys.version,
  ],
};

const BankValidators: FC = () => {
  return (
    <div className="BankValidators">
      <PageTable items={sampleData} />
      <Pagination />
    </div>
  );
};

export default BankValidators;
