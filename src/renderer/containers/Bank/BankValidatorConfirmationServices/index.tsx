import React, {FC, useMemo} from 'react';

import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
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
  const [expanded, toggleExpanded] = useBooleanState(false);
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
        [TableKeys.id]: <ExpandableText expanded={expanded} text={validatorConfirmationService.id} />,
        [TableKeys.modifiedDate]: formatDate(validatorConfirmationService.modified_date),
        [TableKeys.start]: formatDate(validatorConfirmationService.start),
        [TableKeys.validator]: <ExpandableText expanded={expanded} text={validatorConfirmationService.validator} />,
      })) || [],
    [bankValidatorConfirmationServices, expanded],
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
      expanded={expanded}
      items={pageTableItems}
      loading={loading}
      setPage={setPage}
      toggleExpanded={toggleExpanded}
      totalPages={totalPages}
    />
  );
};

export default BankValidatorConfirmationServices;
