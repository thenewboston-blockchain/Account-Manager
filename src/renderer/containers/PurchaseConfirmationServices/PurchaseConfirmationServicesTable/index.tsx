import React, {Dispatch, FC, useCallback, useMemo} from 'react';
import clsx from 'clsx';

import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';
import {BANK_VALIDATORS} from '@renderer/constants/actions';
import {useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BaseValidator} from '@renderer/types';

import {SelectedValidatorAction, SelectedValidatorState, toggleSelectedValidator} from '../utils';
import './PurchaseConfirmationServicesTable.scss';

interface ComponentProps {
  bankAddress: string;
  className?: string;
  dispatchSelectedValidators: Dispatch<SelectedValidatorAction>;
  selectedValidators: SelectedValidatorState;
}

enum TableKeys {
  accountNumber,
  dailyConfirmationRate,
  defaultTransactionFee,
  ipAddress,
  nodeIdentifier,
  port,
  protocol,
  trust,
  version,
}

const PurchaseConfirmationServicesTable: FC<ComponentProps> = ({
  bankAddress,
  className,
  dispatchSelectedValidators,
  selectedValidators,
}) => {
  const [expanded, toggleExpanded] = useBooleanState(false);
  const {
    count,
    currentPage,
    loading,
    results: bankValidators,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BaseValidator>(BANK_VALIDATORS, bankAddress);

  const handleCheckboxClick = useCallback(
    (validatorIndex: number) => () => {
      const validator = bankValidators[validatorIndex];
      dispatchSelectedValidators(
        toggleSelectedValidator({
          ...validator,
          index: (currentPage - 1) * PAGINATED_RESULTS_LIMIT + validatorIndex,
        }),
      );
    },
    [bankValidators, currentPage, dispatchSelectedValidators],
  );

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator, index) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: <ExpandableText expanded={expanded} text={validator.account_number} />,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: validator.ip_address,
        [TableKeys.nodeIdentifier]: (
          <span className="PurchaseConfirmationServicesTable__node-identifier" onClick={handleCheckboxClick(index)}>
            <ExpandableText expanded={expanded} text={validator.node_identifier} />
          </span>
        ),
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.trust]: validator.trust,
        [TableKeys.version]: validator.version,
      })) || [],
    [bankValidators, expanded, handleCheckboxClick],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankValidatorsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.dailyConfirmationRate]: 'Daily Rate',
        [TableKeys.defaultTransactionFee]: 'Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'Network ID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.dailyConfirmationRate,
        TableKeys.accountNumber,
        TableKeys.defaultTransactionFee,
        TableKeys.protocol,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.trust,
        TableKeys.version,
      ],
    }),
    [bankValidatorsTableData],
  );

  return (
    <PaginatedTable
      className={clsx('PurchaseConfirmationServicesTable', className)}
      count={count}
      currentPage={currentPage}
      expanded={expanded}
      handleSelectRow={handleCheckboxClick}
      items={pageTableItems}
      loading={loading}
      selectedData={selectedValidators}
      setPage={setPage}
      toggleExpanded={toggleExpanded}
      totalPages={totalPages}
    />
  );
};

export default PurchaseConfirmationServicesTable;
