import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants';
import {useAddress, useNetworkDataFetcher} from '@renderer/hooks';
import {getBankConfirmationBlocks} from '@renderer/selectors';

enum TableKeys {
  id,
  block,
  blockIdentifier,
  validator,
}

const BankConfirmationBlocks: FC = () => {
  const loading = useNetworkDataFetcher(BANK_CONFIRMATION_BLOCKS);
  const address = useAddress();
  const bankConfirmationBlocksObject = useSelector(getBankConfirmationBlocks);
  const bankConfirmationBlocks = bankConfirmationBlocksObject[address];

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
