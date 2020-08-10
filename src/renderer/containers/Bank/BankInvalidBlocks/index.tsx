import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankInvalidBlocks} from '@renderer/dispatchers/banks';
import useAddress from '@renderer/hooks/useAddress';
import {getBankInvalidBlocks} from '@renderer/selectors';
import {unsetBankInvalidBlocks} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types/store';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankInvalidBlocks: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankInvalidBlocksObject = useSelector(getBankInvalidBlocks);
  const bankInvalidBlocks = bankInvalidBlocksObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankInvalidBlocks(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankInvalidBlocks({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  // TODO
  const bankInvalidBlockTableData = useMemo<PageTableData[]>(
    () =>
      bankInvalidBlocks?.results.map((invalidBlock) => ({
        key: invalidBlock.node_identifier,
        [TableKeys.blockIdentifier]: invalidBlock.node_identifier,
        [TableKeys.block]: '',
        [TableKeys.id]: '',
        [TableKeys.validator]: '',
      })) || [],
    [bankInvalidBlocks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankInvalidBlockTableData,
      headers: {
        [TableKeys.blockIdentifier]: 'Block Identifier',
        [TableKeys.block]: 'Block',
        [TableKeys.id]: 'ID',
        [TableKeys.validator]: 'Validator',
      },
      orderedKeys: [TableKeys.id, TableKeys.block, TableKeys.blockIdentifier, TableKeys.validator],
    }),
    [bankInvalidBlockTableData],
  );

  return (
    <div className="BankInvalidBlocks">
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

export default BankInvalidBlocks;
