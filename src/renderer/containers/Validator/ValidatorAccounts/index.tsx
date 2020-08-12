import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {VALIDATOR_ACCOUNTS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getValidatorAccounts} from '@renderer/selectors';

enum TableKeys {
  accountNumber,
  balance,
  balanceLock,
}

const ValidatorAccounts: FC = () => {
  const loading = useNetworkDataFetcher(VALIDATOR_ACCOUNTS);
  const address = useAddress();
  const validatorAccountsObject = useSelector(getValidatorAccounts);
  const validatorAccounts = validatorAccountsObject[address];

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorAccounts?.results.map((account) => ({
        key: account.id,
        [TableKeys.accountNumber]: account.account_number,
        [TableKeys.balanceLock]: account.balance_lock,
        [TableKeys.balance]: account.balance,
      })) || [],
    [validatorAccounts],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.balanceLock]: 'Balance Lock',
        [TableKeys.balance]: 'Balance',
      },
      orderedKeys: [TableKeys.accountNumber, TableKeys.balance, TableKeys.balanceLock],
    }),
    [validatorAccountsTableData],
  );

  return (
    <div className="ValidatorAccounts">
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

export default ValidatorAccounts;
