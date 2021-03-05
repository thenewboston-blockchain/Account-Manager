import React, {FC, useMemo} from 'react';

import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_INVALID_BLOCKS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {InvalidBlock} from '@renderer/types';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankInvalidBlocks: FC = () => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
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
        [TableKeys.blockIdentifier]: <ExpandableText expanded={expanded} text={invalidBlock.block_identifier} />,
        [TableKeys.block]: <ExpandableText expanded={expanded} text={invalidBlock.block} />,
        [TableKeys.id]: <ExpandableText expanded={expanded} text={invalidBlock.id} />,
        [TableKeys.validator]: <ExpandableText expanded={expanded} text={invalidBlock.primary_validator} />,
      })) || [],
    [bankInvalidBlocks, expanded],
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
      expanded={expanded}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      toggleExpanded={toggleExpanded}
      totalPages={totalPages}
    />
  );
};

export default BankInvalidBlocks;
