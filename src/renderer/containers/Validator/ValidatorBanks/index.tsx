import React, {FC, useMemo} from 'react';

import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {VALIDATOR_BANKS} from '@renderer/constants';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ValidatorBank} from '@renderer/types';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  confirmationExpiration,
  trust,
}

const ValidatorBanks: FC = () => {
  const address = useAddress();
  const {count, currentPage, loading, results: validatorBanks, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    ValidatorBank
  >(VALIDATOR_BANKS, address);

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorBanks.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: bank.account_number,
        [TableKeys.confirmationExpiration]: bank.confirmation_expiration,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={bank} urlBase="bank" />,
        [TableKeys.nodeIdentifier]: bank.node_identifier,
        [TableKeys.port]: bank.port,
        [TableKeys.protocol]: bank.protocol,
        [TableKeys.trust]: bank.trust,
        [TableKeys.version]: bank.version,
      })) || [],
    [validatorBanks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.confirmationExpiration]: 'Confirmation Expiration',
        [TableKeys.defaultTransactionFee]: 'Transaction Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'NID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
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
        TableKeys.confirmationExpiration,
        TableKeys.trust,
      ],
    }),
    [validatorAccountsTableData],
  );

  return (
    <div className="ValidatorBanks">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ValidatorBanks;
