import React, {FC} from 'react';

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
              key: 'Transaction Fee',
              value: validatorConfig.default_transaction_fee,
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
