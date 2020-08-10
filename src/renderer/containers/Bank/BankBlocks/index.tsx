import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankBlocks} from '@renderer/dispatchers/banks';
import useAddress from '@renderer/hooks/useAddress';
import {getBankBlocks} from '@renderer/selectors';
import {unsetBankBlocks} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types/store';

enum TableKeys {
  id,
  balanceKey,
  sender,
  signature,
  createdDate,
  modifiedDate,
}

const BankBlocks: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankBlocksObject = useSelector(getBankBlocks);
  const bankBlocks = bankBlocksObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankBlocks(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankBlocks({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankBlocksTableData = useMemo<PageTableData[]>(
    () =>
      bankBlocks?.results.map((block) => ({
        key: block.id,
        [TableKeys.balanceKey]: block.balance_key,
        [TableKeys.createdDate]: block.created_date,
        [TableKeys.id]: block.id,
        [TableKeys.modifiedDate]: block.modified_date,
        [TableKeys.sender]: block.sender,
        [TableKeys.signature]: block.signature,
      })) || [],
    [bankBlocks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankBlocksTableData,
      headers: {
        [TableKeys.balanceKey]: 'Balance Key',
        [TableKeys.createdDate]: 'Created',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.sender]: 'Sender',
        [TableKeys.signature]: 'Signature',
      },
      orderedKeys: [
        TableKeys.id,
        TableKeys.balanceKey,
        TableKeys.sender,
        TableKeys.signature,
        TableKeys.createdDate,
        TableKeys.modifiedDate,
      ],
    }),
    [bankBlocksTableData],
  );

  return (
    <div className="BankBlocks">
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

export default BankBlocks;
