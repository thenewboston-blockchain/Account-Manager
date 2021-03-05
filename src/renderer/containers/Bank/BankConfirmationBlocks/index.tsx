import React, {FC, useMemo} from 'react';

import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankConfirmationBlock} from '@renderer/types';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankConfirmationBlocks: FC = () => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
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
        [TableKeys.blockIdentifier]: <ExpandableText expanded={expanded} text={confirmationBlock.block_identifier} />,
        [TableKeys.block]: <ExpandableText expanded={expanded} text={confirmationBlock.block} />,
        [TableKeys.id]: <ExpandableText expanded={expanded} text={confirmationBlock.id} />,
        [TableKeys.validator]: <ExpandableText expanded={expanded} text={confirmationBlock.validator} />,
      })) || [],
    [bankConfirmationBlocks, expanded],
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
      expanded={expanded}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      toggleExpanded={toggleExpanded}
      totalPages={totalPages}
    />
  );
};

export default BankConfirmationBlocks;
