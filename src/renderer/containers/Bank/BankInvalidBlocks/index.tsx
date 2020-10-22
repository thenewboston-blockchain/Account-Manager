import React, {FC, useMemo} from 'react';

import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_INVALID_BLOCKS} from '@renderer/constants';
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
  const {count, currentPage, loading, results: bankInvalidBlocks, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    InvalidBlock
  >(BANK_INVALID_BLOCKS, address);

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
    <div className="BankInvalidBlocks">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default BankInvalidBlocks;
