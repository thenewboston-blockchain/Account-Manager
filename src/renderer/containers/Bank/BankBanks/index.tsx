import React, {FC, useMemo} from 'react';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_BANKS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {Node} from '@renderer/types';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  defaultTransactionFee,
  protocol,
  ipAddress,
  port,
  trust,
  version,
}

const BankBanks: FC = () => {
  const {currentPage, loading, results: bankBanks, setPage, totalPages} = usePaginatedNetworkDataFetcher<Node>(
    BANK_BANKS,
  );

  const bankBanksTableData = useMemo<PageTableData[]>(
    () =>
      bankBanks.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: bank.account_number,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: bank.ip_address,
        [TableKeys.nodeIdentifier]: bank.node_identifier,
        [TableKeys.port]: bank.port,
        [TableKeys.protocol]: bank.protocol,
        [TableKeys.trust]: bank.trust,
        [TableKeys.version]: bank.version,
      })) || [],
    [bankBanks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBanksTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.defaultTransactionFee]: 'Default Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'Network ID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
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
        TableKeys.trust,
        TableKeys.version,
      ],
    }),
    [bankBanksTableData],
  );

  return (
    <div className="BankBanks">
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

export default BankBanks;
