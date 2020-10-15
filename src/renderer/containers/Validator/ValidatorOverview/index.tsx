import React, {FC, useRef} from 'react';

import A from '@renderer/components/A';
import {Loader} from '@renderer/components/FormElements';
import {
  TileValidatorSigningDetails,
  TileKeyValueList,
  TilePrimaryAmount,
  TileDailyRate,
} from '@renderer/components/Tiles';
import {VALIDATOR_CONFIGS} from '@renderer/constants';
import {useNetworkConfigFetcher} from '@renderer/hooks';
import {ValidatorConfig} from '@renderer/types';

import './ValidatorOverview.scss';

const ValidatorOverview: FC = () => {
  const validatorAccountNumberRef = useRef<HTMLDivElement>(null);
  const validatorNetworkIdRef = useRef<HTMLDivElement>(null);
  const {data: validatorConfig, loading} = useNetworkConfigFetcher<ValidatorConfig>(VALIDATOR_CONFIGS);

  return (
    <div className="ValidatorOverview">
      {loading || !validatorConfig ? (
        <Loader />
      ) : (
        <>
          <div className="ValidatorOverview__left">
            <TilePrimaryAmount amount={validatorConfig.default_transaction_fee} title="Tx Fee" />
            <TileDailyRate amount={validatorConfig.daily_confirmation_rate || '-'} title="Daily Rate" />
            <TileKeyValueList
              items={[
                {
                  key: 'IP Address',
                  value: validatorConfig.ip_address,
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
                  key: 'Root Account File',
                  value: (
                    <A className="ValidatorOverview__link" href={validatorConfig.root_account_file}>
                      {validatorConfig.root_account_file}
                    </A>
                  ),
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
            />
          </div>
          <div className="ValidatorOverview__right">
            <TileValidatorSigningDetails
              items={[
                {
                  key: 'validatorNetworkId',
                  ref: validatorNetworkIdRef,
                  title: 'Validator Network ID',
                  value: validatorConfig.node_identifier,
                },
                {
                  key: 'validatorAccountNumber',
                  ref: validatorAccountNumberRef,
                  title: 'Validator Account Number ',
                  value: validatorConfig.account_number,
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ValidatorOverview;
