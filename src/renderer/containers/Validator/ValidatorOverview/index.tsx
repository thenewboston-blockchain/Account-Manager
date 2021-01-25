import React, {FC, useRef} from 'react';

import A from '@renderer/components/A';
import {Loader} from '@renderer/components/FormElements';
import {
  TileCrawlClean,
  TileKeyValueList,
  TileValidatorSigningDetails,
  TileWithAmount,
} from '@renderer/components/Tiles';
import {VALIDATOR_CONFIGS} from '@renderer/constants/actions';
import {useNetworkCleanFetcher, useNetworkConfigFetcher, useNetworkCrawlFetcher} from '@renderer/hooks';
import {ManagedNode, ValidatorConfig} from '@renderer/types';

import './ValidatorOverview.scss';

interface ComponentProps {
  isActivePrimaryValidator: boolean;
  isAuthenticated: boolean;
  managedValidator?: ManagedNode;
}

const ValidatorOverview: FC<ComponentProps> = ({isActivePrimaryValidator, isAuthenticated, managedValidator}) => {
  const {data: validatorConfig, loading} = useNetworkConfigFetcher<ValidatorConfig>(VALIDATOR_CONFIGS);
  const {crawlStatus, handleCrawlClick, loadingCrawl, submittingCrawl} = useNetworkCrawlFetcher(
    managedValidator,
    isAuthenticated && !isActivePrimaryValidator,
  );
  const {cleanStatus, handleCleanClick, loadingClean, submittingClean} = useNetworkCleanFetcher(
    managedValidator,
    isAuthenticated && !isActivePrimaryValidator,
  );
  const validatorAccountNumberRef = useRef<HTMLDivElement>(null);
  const validatorNetworkIdRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ValidatorOverview">
      {loading || !validatorConfig ? (
        <Loader />
      ) : (
        <>
          <div className="ValidatorOverview__left">
            <TileWithAmount amount={validatorConfig.default_transaction_fee} title="Tx Fee" />
            <TileWithAmount amount={validatorConfig.daily_confirmation_rate || '-'} title="Daily Rate" />
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
            {isAuthenticated && !isActivePrimaryValidator ? (
              <TileCrawlClean
                crawlStatus={crawlStatus}
                handleCrawlClick={handleCrawlClick}
                loadingCrawlStatus={loadingCrawl}
                submittingCrawl={submittingCrawl}
                cleanStatus={cleanStatus}
                handleCleanClick={handleCleanClick}
                loadingCleanStatus={loadingClean}
                submittingClean={submittingClean}
              />
            ) : null}
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
