import React, {FC, useMemo} from 'react';

import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ValidatorConfirmationService} from '@renderer/types';

enum TableKeys {
  createdDate,
  end,
  id,
  modifiedDate,
  start,
  validator,
}

const BankValidatorConfirmationServices: FC = () => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: bankValidatorConfirmationServices,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<ValidatorConfirmationService>(BANK_VALIDATOR_CONFIRMATION_SERVICES, address);

  const bankValidatorConfirmationServicesTableData = useMemo<PageTableData[]>(
    () =>
      bankValidatorConfirmationServices.map((validatorConfirmationService) => ({
        key: validatorConfirmationService.id,
        [TableKeys.createdDate]: validatorConfirmationService.created_date,
        [TableKeys.end]: validatorConfirmationService.end,
        [TableKeys.id]: validatorConfirmationService.id,
        [TableKeys.modifiedDate]: validatorConfirmationService.modified_date,
        [TableKeys.start]: validatorConfirmationService.start,
        [TableKeys.validator]: validatorConfirmationService.validator,
      })) || [],
    [bankValidatorConfirmationServices],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankValidatorConfirmationServicesTableData,
      headers: {
        [TableKeys.createdDate]: 'Created',
        [TableKeys.end]: 'End',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.start]: 'Start',
        [TableKeys.validator]: 'Validator',
      },
      orderedKeys: [
        TableKeys.createdDate,
        TableKeys.end,
        TableKeys.id,
        TableKeys.modifiedDate,
        TableKeys.start,
        TableKeys.validator,
      ],
    }),
    [bankValidatorConfirmationServicesTableData],
  );

  return (
    <div className="BankValidatorConfirmationServices">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default BankValidatorConfirmationServices;
