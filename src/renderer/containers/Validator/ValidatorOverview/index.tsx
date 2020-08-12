import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import DetailPanel from '@renderer/components/DetailPanel';
import {Loader} from '@renderer/components/FormElements';
import {VALIDATOR_CONFIGS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getValidatorConfigs} from '@renderer/selectors';

import './ValidatorOverview.scss';

const ValidatorOverview: FC = () => {
  const loading = useNetworkDataFetcher(VALIDATOR_CONFIGS);
  const address = useAddress();
  const validatorConfigs = useSelector(getValidatorConfigs);
  const validatorConfig = validatorConfigs[address];

  return (
    <div className="ValidatorOverview">
      {loading ? (
        <Loader />
      ) : (
        <DetailPanel
          items={[
            {
              key: 'Account Number',
              value: validatorConfig.data.account_number,
            },
            {
              key: 'IP Address',
              value: validatorConfig.data.ip_address,
            },
            {
              key: 'Network ID',
              value: validatorConfig.data.node_identifier,
            },
            {
              key: 'Port',
              value: validatorConfig.data.port || '-',
            },
            {
              key: 'Protocol',
              value: validatorConfig.data.protocol,
            },
            {
              key: 'Version',
              value: validatorConfig.data.version,
            },
            {
              key: 'Transaction Fee',
              value: validatorConfig.data.default_transaction_fee,
            },
            {
              key: 'Node Type',
              value: validatorConfig.data.node_type,
            },
          ]}
          title="Validator Information"
        />
      )}
    </div>
  );
};

export default ValidatorOverview;
