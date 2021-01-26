import React, {FC, useMemo} from 'react';

import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_INVALID_BLOCKS} from '@renderer/constants/actions';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {InvalidBlock} from '@renderer/types';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankInvalidBlocks: FC = () => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: bankInvalidBlocks,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<InvalidBlock>(BANK_INVALID_BLOCKS, address);

  const bankInvalidBlockTableData = useMemo<PageTableData[]>(
    () =>
      bankInvalidBlocks.map((invalidBlock) => ({
        key: invalidBlock.id,
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
    <PaginatedTable
      className="BankInvalidBlocks"
      count={count}
      currentPage={currentPage}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
};

export default BankInvalidBlocks;
