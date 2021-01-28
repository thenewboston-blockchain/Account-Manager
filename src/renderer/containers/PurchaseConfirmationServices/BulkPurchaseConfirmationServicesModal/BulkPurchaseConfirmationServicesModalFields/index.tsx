import React, {ChangeEvent, Dispatch, FC, useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Input} from '@renderer/components/FormElements';
import PageTable from '@renderer/components/PageTable';
import {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {getBankConfigs} from '@renderer/selectors';
import {ManagedNode} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import ConnectionStatus from '../../ConnectionStatus';
import {
  checkConnectionBankToValidator,
  checkConnectionValidatorToBank,
  SelectedValidatorState,
  setValidatorInForm,
  ValidatorConnectionStatus,
  ValidatorFormAction,
  ValidatorFormState,
} from '../../utils';
import './BulkPurchaseConfirmationServicesModalFields.scss';

interface ComponentProps {
  bank: ManagedNode;
  dispatchFormValues: Dispatch<ValidatorFormAction>;
  formValues: ValidatorFormState;
  initialValidatorsData: SelectedValidatorState;
  orderedNodeIdentifiers: string[];
  submitting: boolean;
}

enum TableKeys {
  amount,
  dailyRate,
  nodeIdentifier,
  removeValidator,
  status,
}

const BulkPurchaseConfirmationServicesModalFields: FC<ComponentProps> = ({
  bank,
  dispatchFormValues,
  formValues,
  initialValidatorsData,
  orderedNodeIdentifiers,
  submitting,
}) => {
  const bankAddress = formatAddressFromNode(bank);
  const bankConfigs = useSelector(getBankConfigs);
  const {
    data: {node_identifier: bankNodeIdentifier},
  } = bankConfigs[bankAddress];

  const testConnection = useCallback(
    async (validatorNodeIdentifier: string) => {
      const validator = initialValidatorsData[validatorNodeIdentifier];
      const formValue = formValues[validatorNodeIdentifier];
      try {
        await Promise.all([
          checkConnectionBankToValidator(bank, validator),
          checkConnectionValidatorToBank(bank, validator, bankNodeIdentifier),
        ]);
        dispatchFormValues(
          setValidatorInForm({
            amount: formValue.amount,
            nodeIdentifier: validatorNodeIdentifier,
            status: ValidatorConnectionStatus.connected,
          }),
        );
      } catch (error) {
        dispatchFormValues(
          setValidatorInForm({
            amount: '',
            nodeIdentifier: validatorNodeIdentifier,
            status: ValidatorConnectionStatus.notConnected,
          }),
        );
      }
    },
    [bank, bankNodeIdentifier, dispatchFormValues, formValues, initialValidatorsData],
  );

  useEffect(() => {
    for (const nodeIdentifier of orderedNodeIdentifiers) {
      testConnection(nodeIdentifier);
    }
    // ensure that this only runs once
    // eslint-disable-next-line
  }, []);

  const handleAmountChange = useCallback(
    (nodeIdentifier: string) => (e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      if (submitting) return;
      const formValue = formValues[nodeIdentifier];
      dispatchFormValues(setValidatorInForm({amount: e.target.value, nodeIdentifier, status: formValue.status}));
    },
    [dispatchFormValues, formValues, submitting],
  );

  const validatorsTableData = useMemo<PageTableData[]>(
    () =>
      orderedNodeIdentifiers.map((nodeIdentifier) => {
        const formData = formValues[nodeIdentifier];
        const validatorData = initialValidatorsData[nodeIdentifier];

        return {
          key: nodeIdentifier,
          [TableKeys.amount]: (
            <Input
              className="BulkPurchaseConfirmationServicesModalFields__Input"
              onChange={handleAmountChange(nodeIdentifier)}
              disabled={formData.status !== ValidatorConnectionStatus.connected || submitting}
              type="number"
              value={formData.amount}
            />
          ),
          [TableKeys.dailyRate]: validatorData.daily_confirmation_rate,
          [TableKeys.nodeIdentifier]: nodeIdentifier,
          [TableKeys.removeValidator]: 'X',
          [TableKeys.status]: <ConnectionStatus status={formData.status} />,
        };
      }),
    [formValues, handleAmountChange, initialValidatorsData, orderedNodeIdentifiers, submitting],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorsTableData,
      headers: {
        [TableKeys.amount]: (
          <span>
            Amount
            <RequiredAsterisk />
          </span>
        ),
        [TableKeys.dailyRate]: 'Daily Rate',
        [TableKeys.nodeIdentifier]: 'Validator Network ID',
        [TableKeys.removeValidator]: '',
        [TableKeys.status]: 'Status',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.status,
        TableKeys.dailyRate,
        TableKeys.amount,
        TableKeys.removeValidator,
      ],
    }),
    [validatorsTableData],
  );

  return (
    <div className="BulkPurchaseConfirmationServicesModalFields">
      <div className="BulkPurchaseConfirmationServicesModalFields__left">
        <PageTable
          alwaysExpanded
          className="BulkPurchaseConfirmationServicesModalFields__table"
          items={pageTableItems}
        />
      </div>
      <div className="BulkPurchaseConfirmationServicesModalFields__right">
        <div className="BulkPurchaseConfirmationServicesModalFields__bank-address">{bankAddress}</div>
        <div className="BulkPurchaseConfirmationServicesModalFields__bank-nickname">{bank.nickname}</div>
      </div>
    </div>
  );
};

export default BulkPurchaseConfirmationServicesModalFields;
