import React, {FC} from 'react';

import DetailPanel from '@renderer/components/DetailPanel';
import {PageLoader} from '@renderer/components/FormElements';
import {BANK_CONFIGS} from '@renderer/constants';
import {useNetworkConfigFetcher} from '@renderer/hooks';
import {BankConfig} from '@renderer/types';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const {data: bankConfig, loading} = useNetworkConfigFetcher<BankConfig>(BANK_CONFIGS);

  return (
    <div className="BankOverview">
      {loading || !bankConfig ? (
        <PageLoader />
      ) : (
        <DetailPanel
          items={[
            {
              key: 'Account Number',
              value: bankConfig.account_number,
            },
            {
              key: 'IP Address',
              value: bankConfig.ip_address,
            },
            {
              key: 'Network ID',
              value: bankConfig.node_identifier,
            },
            {
              key: 'Port',
              value: bankConfig.port || '-',
            },
            {
              key: 'Protocol',
              value: bankConfig.protocol,
            },
            {
              key: 'Version',
              value: bankConfig.version,
            },
            {
              key: 'Tx Fee',
              value: bankConfig.default_transaction_fee,
            },
            {
              key: 'Node Type',
              value: bankConfig.node_type,
            },
          ]}
          title="Bank Information"
        />
      )}
    </div>
  );
};

export default BankOverview;
