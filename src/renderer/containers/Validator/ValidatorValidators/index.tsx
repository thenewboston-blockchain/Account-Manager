import React, {FC, useMemo} from 'react';

import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import {VALIDATOR_VALIDATORS} from '@renderer/constants';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BaseValidator} from '@renderer/types';
import Pagination from '@renderer/components/Pagination';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  dailyConfirmationRate,
  trust,
}

const ValidatorValidators: FC = () => {
  const address = useAddress();
  const {currentPage, loading, results: validatorValidators, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BaseValidator
  >(VALIDATOR_VALIDATORS, address);

  const validatorValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      validatorValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: validator.account_number,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={validator} urlBase="validator" />,
        [TableKeys.nodeIdentifier]: validator.node_identifier,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.rootAccountFileHash]: validator.root_account_file_hash,
        [TableKeys.rootAccountFile]: validator.root_account_file,
        [TableKeys.seedBlockIdentifier]: validator.seed_block_identifier,
        [TableKeys.trust]: validator.trust,
        [TableKeys.version]: validator.version,
      })) || [],
    [validatorValidators],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorValidatorsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.dailyConfirmationRate]: 'Daily Confirmation Rate',
        [TableKeys.defaultTransactionFee]: 'Transaction Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'NID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
        [TableKeys.rootAccountFile]: 'Root Account File',
        [TableKeys.seedBlockIdentifier]: 'Seed Block',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.accountNumber,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.protocol,
        TableKeys.version,
        TableKeys.defaultTransactionFee,
        TableKeys.rootAccountFile,
        TableKeys.rootAccountFileHash,
        TableKeys.seedBlockIdentifier,
        TableKeys.dailyConfirmationRate,
        TableKeys.trust,
      ],
    }),
    [validatorValidatorsTableData],
  );

  return (
    <div className="ValidatorValidators">
      <PageTable items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ValidatorValidators;
