import React, {FC} from 'react';

import A from '@renderer/components/A';
import DetailPanel from '@renderer/components/DetailPanel';
import {Loader} from '@renderer/components/FormElements';
import {VALIDATOR_CONFIGS} from '@renderer/constants';
import {useNetworkConfigFetcher} from '@renderer/hooks';
import {ValidatorConfig} from '@renderer/types';

import './ValidatorOverview.scss';

const ValidatorOverview: FC = () => {
  const {data: validatorConfig, loading} = useNetworkConfigFetcher<ValidatorConfig>(VALIDATOR_CONFIGS);

  return (
    <div className="ValidatorOverview">
      {loading || !validatorConfig ? (
        <Loader />
      ) : (
        <DetailPanel
          items={[
            {
              key: 'Account Number',
              value: validatorConfig.account_number,
            },
            {
              key: 'IP Address',
              value: validatorConfig.ip_address,
            },
            {
              key: 'Network ID',
              value: validatorConfig.node_identifier,
            },
            {
              key: 'Port',
              value: validatorConfig.port || '-',
            },
            {
              key: 'Protocol',
              value: validatorConfig.protocol,
            },
            {
              key: 'Version',
              value: validatorConfig.version,
            },
            {
              key: 'Tx Fee',
              value: validatorConfig.default_transaction_fee,
            },
            {
              key: 'Daily Rate',
              value: validatorConfig.daily_confirmation_rate || '-',
            },
            {
              key: 'Root Account File',
              value: <A href={validatorConfig.root_account_file}>{validatorConfig.root_account_file}</A>,
            },
            {
              key: 'Root Account File Hash',
              value: validatorConfig.root_account_file_hash,
            },
            {
              key: 'Seed Block Identifier',
              value: validatorConfig.seed_block_identifier || '-',
            },
            {
              key: 'Node Type',
              value: validatorConfig.node_type,
            },
          ]}
          title="Validator Information"
        />
      )}
    </div>
  );
};

export default ValidatorOverview;
