import React, {FC, useMemo} from 'react';

import AccountNumberLink from '@renderer/components/AccountNumberLink';
import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_VALIDATORS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BaseValidator} from '@renderer/types';

enum TableKeys {
  accountNumber,
  dailyConfirmationRate,
  defaultTransactionFee,
  ipAddress,
  nodeIdentifier,
  port,
  protocol,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  trust,
  version,
}

const BankValidators: FC = () => {
  const {currentPage, loading, results: bankValidators, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BaseValidator
  >(BANK_VALIDATORS);

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: <AccountNumberLink accountNumber={validator.account_number} />,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: validator.ip_address,
        [TableKeys.nodeIdentifier]: validator.node_identifier,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.rootAccountFileHash]: validator.root_account_file_hash,
        [TableKeys.rootAccountFile]: validator.root_account_file,
        [TableKeys.seedBlockIdentifier]: validator.seed_block_identifier,
        [TableKeys.trust]: validator.trust,
        [TableKeys.version]: validator.version,
      })) || [],
    [bankValidators],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankValidatorsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.dailyConfirmationRate]: 'Daily Confirmation Rate',
        [TableKeys.defaultTransactionFee]: 'Default Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'Network ID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
        [TableKeys.rootAccountFile]: 'Root Account File',
        [TableKeys.seedBlockIdentifier]: 'Seed Block Identifier',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.accountNumber,
        TableKeys.defaultTransactionFee,
        TableKeys.protocol,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.dailyConfirmationRate,
        TableKeys.rootAccountFile,
        TableKeys.rootAccountFileHash,
        TableKeys.seedBlockIdentifier,
        TableKeys.trust,
        TableKeys.version,
      ],
    }),
    [bankValidatorsTableData],
  );

  return (
    <div className="BankValidators">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTable items={pageTableItems} />
          <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default BankValidators;
