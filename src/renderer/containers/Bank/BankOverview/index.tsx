import React, {FC} from 'react';

import {TilePrimaryAmount, TileKeyValueList, TileBankSigningDetails} from '@renderer/components/Tiles';
import {Loader} from '@renderer/components/FormElements';

import {BANK_CONFIGS} from '@renderer/constants';
import {useNetworkConfigFetcher} from '@renderer/hooks';
import {BankConfig} from '@renderer/types';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const {data: bankConfig, loading} = useNetworkConfigFetcher<BankConfig>(BANK_CONFIGS);

  return (
    <div className="BankOverview">
      {loading || !bankConfig ? (
        <Loader />
      ) : (
        <>
          <div className="BankOverview__left">
            <TilePrimaryAmount title="Tx Fee /per tx" amount={bankConfig.default_transaction_fee} />
            <TilePrimaryAmount title="Confirmation Services" amount={-1} />
            <TileKeyValueList
              items={[
                {
                  key: 'IP Address',
                  value: bankConfig.ip_address,
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
                  key: 'Node Type',
                  value: bankConfig.node_type,
                },
              ]}
            />
          </div>
          <div className="BankOverview__right">
            <TileBankSigningDetails
              items={[
                {
                  key: 'bankNetworkId',
                  title: 'Bank Network ID',
                  value: bankConfig.node_identifier.toString(),
                },
                {
                  key: 'bankAccountNumber',
                  title: 'Bank Account Number',
                  value: bankConfig.account_number.toString(),
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BankOverview;
