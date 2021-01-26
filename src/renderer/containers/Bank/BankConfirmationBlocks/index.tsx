import React, {FC, useMemo} from 'react';

import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants/actions';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankConfirmationBlock} from '@renderer/types';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankConfirmationBlocks: FC = () => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: bankConfirmationBlocks,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BankConfirmationBlock>(BANK_CONFIRMATION_BLOCKS, address);

  const bankConfirmationBlocksTableData = useMemo<PageTableData[]>(
    () =>
      bankConfirmationBlocks.map((confirmationBlock) => ({
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
    <PaginatedTable
      className="BankConfirmationBlocks"
      count={count}
      currentPage={currentPage}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
};

export default BankConfirmationBlocks;
