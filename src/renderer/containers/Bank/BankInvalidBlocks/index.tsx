import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_INVALID_BLOCKS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getBankInvalidBlocks} from '@renderer/selectors';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankInvalidBlocks: FC = () => {
  const loading = useNetworkDataFetcher(BANK_INVALID_BLOCKS);
  const address = useAddress();
  const bankInvalidBlocksObject = useSelector(getBankInvalidBlocks);
  const bankInvalidBlocks = bankInvalidBlocksObject[address];

  const bankInvalidBlockTableData = useMemo<PageTableData[]>(
    () =>
      bankInvalidBlocks?.results.map((invalidBlock) => ({
        key: invalidBlock.block_identifier,
        [TableKeys.blockIdentifier]: invalidBlock.block_identifier,
        [TableKeys.block]: invalidBlock.block,
        [TableKeys.id]: invalidBlock.id,
        [TableKeys.validator]: invalidBlock.primary_validator,
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
