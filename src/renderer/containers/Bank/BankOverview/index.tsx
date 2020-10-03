import React, {FC} from 'react';

import {TilePrimaryAmount, TileKeyValueList, TileBankSigningDetails} from '@renderer/components/Tiles';
import {Loader} from '@renderer/components/FormElements';

import {BANK_CONFIGS, BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants';
import {useAddress, usePaginatedNetworkDataFetcher, useNetworkConfigFetcher} from '@renderer/hooks';
import {BankConfig, ValidatorConfirmationService} from '@renderer/types';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const address = useAddress();
  const {data: bankConfig, loading} = useNetworkConfigFetcher<BankConfig>(BANK_CONFIGS);
  const {count: confirmationServiceCount, loading: confirmationServiceLoading} = usePaginatedNetworkDataFetcher<
    ValidatorConfirmationService
  >(BANK_VALIDATOR_CONFIRMATION_SERVICES, address);

  return (
    <div className="BankOverview">
      {loading || !bankConfig ? (
        <Loader />
      ) : (
        <>
          <div className="BankOverview__left">
            <TilePrimaryAmount title="Tx Fee /per tx" amount={bankConfig.default_transaction_fee} />
            <TilePrimaryAmount
              title="Confirmation Services"
              loading={confirmationServiceLoading}
              amount={confirmationServiceCount}
            />
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
