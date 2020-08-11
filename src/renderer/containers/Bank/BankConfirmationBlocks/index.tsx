import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankConfirmationBlocks} from '@renderer/dispatchers/banks';
import {useAddress} from '@renderer/hooks';
import {getBankConfirmationBlocks} from '@renderer/selectors';
import {unsetBankConfirmationBlocks} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankConfirmationBlocks: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankConfirmationBlocksObject = useSelector(getBankConfirmationBlocks);
  const bankConfirmationBlocks = bankConfirmationBlocksObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankConfirmationBlocks(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankConfirmationBlocks({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankConfirmationBlocksTableData = useMemo<PageTableData[]>(
    () =>
      bankConfirmationBlocks?.results.map((confirmationBlock) => ({
        key: confirmationBlock.id,
        [TableKeys.blockIdentifier]: confirmationBlock.block_identifier,
        [TableKeys.block]: confirmationBlock.block,
        [TableKeys.id]: confirmationBlock.id,
        [TableKeys.validator]: confirmationBlock.validator,
      })) || [],
    [bankConfirmationBlocks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankConfirmationBlocksTableData,
      headers: {
        [TableKeys.blockIdentifier]: 'Block Identifier',
        [TableKeys.block]: 'Block',
        [TableKeys.id]: 'ID',
        [TableKeys.validator]: 'Validator',
      },
      orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.blockIdentifier, TableKeys.validator],
    }),
    [bankConfirmationBlocksTableData],
  );

  return (
    <div className="BankConfirmationBlocks">
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

export default BankConfirmationBlocks;
