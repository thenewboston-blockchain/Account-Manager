import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {VALIDATOR_BANKS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getValidatorBanks} from '@renderer/selectors';

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
  const loading = useNetworkDataFetcher(VALIDATOR_BANKS);
  const address = useAddress();
  const validatorBanksObject = useSelector(getValidatorBanks);
  const validatorBanks = validatorBanksObject[address];

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorBanks?.results.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: bank.account_number,
        [TableKeys.confirmationExpiration]: bank.confirmation_expiration,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: bank.ip_address,
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTable items={pageTableItems} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default ValidatorBanks;
