import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankBankTransactions} from '@renderer/dispatchers/banks';
import {useAddress} from '@renderer/hooks';
import {getBankBankTransactions} from '@renderer/selectors';
import {unsetBankBankTransactions} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types';

enum TableKeys {
  id,
  block,
  sender,
  recipient,
  amount,
}

const BankTransactions: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankBankTransactionsObject = useSelector(getBankBankTransactions);
  const bankBankTransactions = bankBankTransactionsObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankBankTransactions(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankBankTransactions({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankBankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankBankTransactions?.results.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.block]: bankTransaction.block.id,
        [TableKeys.id]: bankTransaction.id,
        [TableKeys.recipient]: bankTransaction.recipient,
        [TableKeys.sender]: bankTransaction.block.sender,
      })) || [],
    [bankBankTransactions],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBankTransactionsTableData,
      headers: {
        [TableKeys.amount]: 'Amount',
        [TableKeys.block]: 'Block',
        [TableKeys.id]: 'ID',
        [TableKeys.recipient]: 'Recipient',
        [TableKeys.sender]: 'Sender',
      },
      orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.sender, TableKeys.recipient, TableKeys.amount],
    }),
    [bankBankTransactionsTableData],
  );

  return (
    <div className="BankTransactions">
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

export default BankTransactions;
