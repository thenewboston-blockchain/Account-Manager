import React, {Dispatch, FC, useMemo} from 'react';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';
import {BANK_VALIDATORS} from '@renderer/constants/actions';
import {usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BaseValidator} from '@renderer/types';

import {SelectedValidatorAction, SelectedValidatorState, toggleSelectedValidator} from '../utils';

interface ComponentProps {
  address: string;
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
  address,
  dispatchSelectedValidators,
  selectedValidators,
}) => {
  const {
    count,
    currentPage,
    loading,
    results: bankValidators,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BaseValidator>(BANK_VALIDATORS, address);

  const handleCheckboxClick = (validatorIndex: number) => () => {
    const nodeIdentifier = bankValidators[validatorIndex].node_identifier;
    dispatchSelectedValidators(
      toggleSelectedValidator({index: (currentPage - 1) * PAGINATED_RESULTS_LIMIT + validatorIndex, nodeIdentifier}),
    );
  };

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: validator.account_number,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: validator.ip_address,
        [TableKeys.nodeIdentifier]: validator.node_identifier,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.trust]: validator.trust,
        [TableKeys.version]: validator.version,
      })) || [],
    [bankValidators],
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
    <div className="PurchaseConfirmationServicesTable">
      <PageTable
        count={count}
        currentPage={currentPage}
        handleSelectRow={handleCheckboxClick}
        items={pageTableItems}
        loading={loading}
        selectedData={selectedValidators}
      />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default PurchaseConfirmationServicesTable;
