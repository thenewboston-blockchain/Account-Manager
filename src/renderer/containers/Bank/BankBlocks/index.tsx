import React, {FC, useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_BLOCKS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BlockResponse} from '@renderer/types';
import {formatDate} from '@renderer/utils/dates';

enum TableKeys {
  id,
  balanceKey,
  sender,
  signature,
  createdDate,
  modifiedDate,
}

const BankBlocks: FC = () => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
  const {
    count,
    currentPage,
    loading,
    results: bankBlocks,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BlockResponse>(BANK_BLOCKS, address);

  const bankBlocksTableData = useMemo<PageTableData[]>(
    () =>
      bankBlocks.map((block) => ({
        key: block.id,
        [TableKeys.balanceKey]: <ExpandableText expanded={expanded} text={block.balance_key} />,
        [TableKeys.createdDate]: formatDate(block.created_date),
        [TableKeys.id]: <ExpandableText expanded={expanded} text={block.id} />,
        [TableKeys.modifiedDate]: formatDate(block.modified_date),
        [TableKeys.sender]: <AccountLink accountNumber={block.sender} expanded={expanded} />,
        [TableKeys.signature]: <ExpandableText expanded={expanded} text={block.signature} />,
      })) || [],
    [bankBlocks, expanded],
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
    <PaginatedTable
      className="BankBlocks"
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

export default BankBlocks;
