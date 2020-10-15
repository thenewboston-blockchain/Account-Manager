import React, {FC, useRef} from 'react';

import {Loader} from '@renderer/components/FormElements';
import {TileBankSigningDetails, TileKeyValueList, TilePrimaryAmount} from '@renderer/components/Tiles';
import {BANK_CONFIGS, BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants';
import {useAddress, useNetworkConfigFetcher, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankConfig, ValidatorConfirmationService} from '@renderer/types';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const address = useAddress();
  const bankAccountNumberRef = useRef<HTMLDivElement>(null);
  const bankNetworkIdRef = useRef<HTMLDivElement>(null);
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
            <TilePrimaryAmount amount={bankConfig.default_transaction_fee} title="Tx Fee (per Tx)" />
            <TilePrimaryAmount
              amount={confirmationServiceCount}
              loading={confirmationServiceLoading}
              title="Confirmation Services"
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
                  ref: bankNetworkIdRef,
                  title: 'Bank Network ID',
                  value: bankConfig.node_identifier,
                },
                {
                  key: 'bankAccountNumber',
                  ref: bankAccountNumberRef,
                  title: 'Bank Account Number',
                  value: bankConfig.account_number,
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
