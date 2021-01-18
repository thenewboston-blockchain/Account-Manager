import React, {FC, useRef} from 'react';

import {Loader} from '@renderer/components/FormElements';
import {TileBankSigningDetails, TileCrawlClean, TileKeyValueList, TilePrimaryAmount} from '@renderer/components/Tiles';
import {BANK_CONFIGS, BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants';
import {
  useAddress,
  useNetworkConfigFetcher,
  useNetworkCrawlFetcher,
  useNetworkCleanFetcher,
  usePaginatedNetworkDataFetcher,
} from '@renderer/hooks';
import {BankConfig, ManagedNode, ValidatorConfirmationService} from '@renderer/types';

import './BankOverview.scss';

interface ComponentProps {
  isAuthenticated: boolean;
  managedBank?: ManagedNode;
}

const BankOverview: FC<ComponentProps> = ({isAuthenticated, managedBank}) => {
  const address = useAddress();
  const {data: bankConfig, loading: loadingConfig} = useNetworkConfigFetcher<BankConfig>(BANK_CONFIGS);
  const {crawlStatus, handleCrawlClick, loadingCrawl, submittingCrawl} = useNetworkCrawlFetcher(
    managedBank,
    isAuthenticated,
  );
  const {cleanStatus, handleCleanClick, loadingClean, submittingClean} = useNetworkCleanFetcher(
    managedBank,
    isAuthenticated,
  );
  const {
    count: confirmationServiceCount,
    loading: confirmationServiceLoading,
  } = usePaginatedNetworkDataFetcher<ValidatorConfirmationService>(BANK_VALIDATOR_CONFIRMATION_SERVICES, address);
  const bankAccountNumberRef = useRef<HTMLDivElement>(null);
  const bankNetworkIdRef = useRef<HTMLDivElement>(null);

  return (
    <div className="BankOverview">
      {loadingConfig || !bankConfig ? (
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
            {isAuthenticated ? (
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
