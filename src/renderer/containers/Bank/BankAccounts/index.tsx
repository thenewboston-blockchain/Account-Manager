import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankAccounts} from '@renderer/dispatchers/banks';
import {useAddress} from '@renderer/hooks';
import {getBankAccounts} from '@renderer/selectors';
import {unsetBankAccounts} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types';

enum TableKeys {
  id,
  accountNumber,
  trust,
  createdDate,
  modifiedDate,
}

const BankAccounts: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankAccountsObject = useSelector(getBankAccounts);
  const bankAccounts = bankAccountsObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankAccounts(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankAccounts({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankAccountsTableData = useMemo<PageTableData[]>(
    () =>
      bankAccounts?.results.map((account) => ({
        key: account.account_number,
        [TableKeys.accountNumber]: account.account_number,
        [TableKeys.createdDate]: account.created_date,
        [TableKeys.id]: account.id,
        [TableKeys.modifiedDate]: account.modified_date,
        [TableKeys.trust]: account.trust,
      })) || [],
    [bankAccounts],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.createdDate]: 'Created',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.trust]: 'Trust',
      },
      orderedKeys: [
        TableKeys.id,
        TableKeys.accountNumber,
        TableKeys.trust,
        TableKeys.createdDate,
        TableKeys.modifiedDate,
      ],
    }),
    [bankAccountsTableData],
  );

  return (
    <div className="BankAccounts">
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

export default BankAccounts;
