import React, {FC, useMemo} from 'react';

import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/actions';
import {useAddress, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ValidatorConfirmationService} from '@renderer/types';
import {formatDate} from '@renderer/utils/dates';

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
        [TableKeys.createdDate]: formatDate(validatorConfirmationService.created_date),
        [TableKeys.end]: formatDate(validatorConfirmationService.end),
        [TableKeys.id]: validatorConfirmationService.id,
        [TableKeys.modifiedDate]: formatDate(validatorConfirmationService.modified_date),
        [TableKeys.start]: formatDate(validatorConfirmationService.start),
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
        TableKeys.id,
        TableKeys.start,
        TableKeys.end,
        TableKeys.validator,
        TableKeys.createdDate,
        TableKeys.modifiedDate,
      ],
    }),
    [bankValidatorConfirmationServicesTableData],
  );

  return (
    <PaginatedTable
      className="BankValidatorConfirmationServices"
      count={count}
      currentPage={currentPage}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
};

export default BankValidatorConfirmationServices;
