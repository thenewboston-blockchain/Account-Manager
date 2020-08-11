import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {OldBank} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  confirmationExpiration,
  trust,
}

const ValidatorBanks: FC = () => {
  const networkValidator = null as any;
  const [banks, setBanks] = useState<OldBank[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/banks`);
      setBanks(data);
    };

    fetchData();
  }, [networkValidator]);

  return (
    <div className="ValidatorBanks">
      <PageTable
        items={{
          data: banks.map((bank) => ({
            key: bank.node_identifier,
            [TableKeys.accountNumber]: bank.account_number,
            [TableKeys.confirmationExpiration]: bank.confirmation_expiration,
            [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
            [TableKeys.ipAddress]: bank.ip_address,
            [TableKeys.nodeIdentifier]: bank.node_identifier,
            [TableKeys.port]: bank.port,
            [TableKeys.protocol]: bank.protocol,
            [TableKeys.trust]: bank.trust,
            [TableKeys.version]: bank.version,
          })),
          headers: {
            [TableKeys.accountNumber]: 'Account Number',
            [TableKeys.confirmationExpiration]: 'Confirmation Expiration',
            [TableKeys.defaultTransactionFee]: 'Transaction Fee',
            [TableKeys.ipAddress]: 'IP Address',
            [TableKeys.nodeIdentifier]: 'NID',
            [TableKeys.port]: 'Port',
            [TableKeys.protocol]: 'Protocol',
            [TableKeys.trust]: 'Trust',
            [TableKeys.version]: 'Version',
          },
          orderedKeys: [
            TableKeys.nodeIdentifier,
            TableKeys.accountNumber,
            TableKeys.ipAddress,
            TableKeys.port,
            TableKeys.protocol,
            TableKeys.version,
            TableKeys.defaultTransactionFee,
            TableKeys.confirmationExpiration,
            TableKeys.trust,
          ],
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorBanks;
