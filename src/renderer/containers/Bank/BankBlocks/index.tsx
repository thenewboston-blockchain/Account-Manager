import React, {FC, useMemo} from 'react';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_BLOCKS} from '@renderer/constants';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BlockResponse} from '@renderer/types';

enum TableKeys {
  id,
  balanceKey,
  sender,
  signature,
  createdDate,
  modifiedDate,
}

const BankBlocks: FC = () => {
  const {currentPage, loading, results: bankBlocks, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BlockResponse
  >(BANK_BLOCKS);

  const bankBlocksTableData = useMemo<PageTableData[]>(
    () =>
      bankBlocks.map((block) => ({
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
          <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default BankBlocks;
