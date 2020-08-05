import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import PageTable from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {Validator} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  dailyConfirmationRate,
  trust,
}

const ValidatorValidators: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.configs.validatorConfigs[nid]);
  const [validators, setValidators] = useState<Validator[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/validators`);
      setValidators(data);
    };

    fetchData();
  }, [networkValidator]);

  return (
    <div className="ValidatorValidators">
      <PageTable
        items={{
          data: validators.map((validator) => ({
            key: validator.node_identifier,
            [TableKeys.accountNumber]: validator.account_number,
            [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
            [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
            [TableKeys.ipAddress]: validator.ip_address,
            [TableKeys.nodeIdentifier]: validator.node_identifier,
            [TableKeys.port]: validator.port,
            [TableKeys.protocol]: validator.protocol,
            [TableKeys.rootAccountFileHash]: validator.root_account_file_hash,
            [TableKeys.rootAccountFile]: validator.root_account_file,
            [TableKeys.seedBlockIdentifier]: validator.seed_block_identifier,
            [TableKeys.trust]: validator.trust,
            [TableKeys.version]: validator.version,
          })),
          headers: {
            [TableKeys.accountNumber]: 'Account Number',
            [TableKeys.dailyConfirmationRate]: 'Daily Confirmation Rate',
            [TableKeys.defaultTransactionFee]: 'Transaction Fee',
            [TableKeys.ipAddress]: 'IP Address',
            [TableKeys.nodeIdentifier]: 'NID',
            [TableKeys.port]: 'Port',
            [TableKeys.protocol]: 'Protocol',
            [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
            [TableKeys.rootAccountFile]: 'Root Account File',
            [TableKeys.seedBlockIdentifier]: 'Seed Block',
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
            TableKeys.rootAccountFile,
            TableKeys.rootAccountFileHash,
            TableKeys.seedBlockIdentifier,
            TableKeys.dailyConfirmationRate,
            TableKeys.trust,
          ],
        }}
      />
      <Pagination />
    </div>
  );
};

export default ValidatorValidators;
