import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import DetailPanel from '@renderer/components/DetailPanel';
import {Loader} from '@renderer/components/FormElements';
import {BANK_CONFIGS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getBankConfigs} from '@renderer/selectors';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const loading = useNetworkDataFetcher(BANK_CONFIGS);
  const bankAddress = useAddress();
  const bankConfigs = useSelector(getBankConfigs);
  const bankConfig = bankConfigs[bankAddress];

  return (
    <div className="BankOverview">
      {loading ? (
        <Loader />
      ) : (
        <DetailPanel
          items={[
            {
              key: 'Account Number',
              value: bankConfig.data.account_number,
            },
            {
              key: 'IP Address',
              value: bankConfig.data.ip_address,
            },
            {
              key: 'Network ID',
              value: bankConfig.data.node_identifier,
            },
            {
              key: 'Port',
              value: bankConfig.data.port,
            },
            {
              key: 'Protocol',
              value: bankConfig.data.protocol,
            },
            {
              key: 'Version',
              value: bankConfig.data.version,
            },
            {
              key: 'Transaction Fee',
              value: bankConfig.data.default_transaction_fee,
            },
            {
              key: 'Node Type',
              value: bankConfig.data.node_type,
            },
          ]}
          title="Bank Information"
        />
      )}
    </div>
  );
};

export default BankOverview;
