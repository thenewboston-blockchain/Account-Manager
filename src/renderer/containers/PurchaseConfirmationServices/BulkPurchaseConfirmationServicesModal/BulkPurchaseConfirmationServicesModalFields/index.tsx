import React, {ChangeEvent, Dispatch, FC, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {Button, Input, Loader} from '@renderer/components/FormElements';
import Icon, {IconType} from '@renderer/components/Icon';
import PageTable from '@renderer/components/PageTable';
import {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {
  getAccountBalances,
  getActivePrimaryValidator,
  getActivePrimaryValidatorConfig,
  getBankConfigs,
} from '@renderer/selectors';
import {AppDispatch, ManagedNode} from '@renderer/types';
import {formatAddressFromNode, isSameNode} from '@renderer/utils/address';
import {getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {displayErrorToast} from '@renderer/utils/toast';
import {getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import ConnectionStatus from '../../ConnectionStatus';
import {
  checkConnectionBankToValidator,
  checkConnectionValidatorToBank,
  removeValidatorInForm,
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
  handleSubmit(): Promise<void>;
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
  handleSubmit,
  initialValidatorsData,
  orderedNodeIdentifiers,
  submitting,
}) => {
  const bankAddress = formatAddressFromNode(bank);
  const dispatch = useDispatch<AppDispatch>();
  const accountBalances = useSelector(getAccountBalances);
  const bankConfigs = useSelector(getBankConfigs);
  const primaryValidator = useSelector(getActivePrimaryValidator);
  const primaryValidatorConfig = useSelector(getActivePrimaryValidatorConfig)!;
  const {
    data: {default_transaction_fee: bankFee, node_identifier: bankNodeIdentifier},
  } = bankConfigs[bankAddress];
  const {publicKeyHex: bankAccountNumber} = getKeyPairFromSigningKeyHex(bank.account_signing_key);
  const bankBalance = accountBalances[bankAccountNumber];

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

  useEffect(() => {
    try {
      dispatch(fetchAccountBalance(bankAccountNumber));
    } catch (error) {
      displayErrorToast(error);
    }
  }, [bankAccountNumber, dispatch]);

  const handleAmountChange = useCallback(
    (nodeIdentifier: string) => (e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      if (submitting) return;
      const formValue = formValues[nodeIdentifier];
      dispatchFormValues(setValidatorInForm({amount: e.target.value, nodeIdentifier, status: formValue.status}));
    },
    [dispatchFormValues, formValues, submitting],
  );

  const handleRemoveValidator = useCallback(
    (nodeIdentifier: string) => (): void => {
      if (submitting) return;
      dispatchFormValues(removeValidatorInForm({nodeIdentifier}));
    },
    [dispatchFormValues, submitting],
  );

  const validatorsTableData = useMemo<PageTableData[]>(
    () =>
      orderedNodeIdentifiers
        .filter((nodeIdentifier) => !!formValues[nodeIdentifier])
        .map((nodeIdentifier) => {
          const formData = formValues[nodeIdentifier];
          const validatorData = initialValidatorsData[nodeIdentifier];

          const noDailyRate = !validatorData.daily_confirmation_rate;
          const validatorIsPv = primaryValidator && isSameNode(primaryValidator, validatorData);
          const amountIsDisabled =
            noDailyRate || validatorIsPv || formData.status !== ValidatorConnectionStatus.connected || submitting;

          return {
            key: nodeIdentifier,
            [TableKeys.amount]: (
              <Input
                className="BulkPurchaseConfirmationServicesModalFields__Input"
                onChange={handleAmountChange(nodeIdentifier)}
                disabled={amountIsDisabled}
                type="number"
                value={formData.amount}
              />
            ),
            [TableKeys.dailyRate]: validatorData.daily_confirmation_rate,
            [TableKeys.nodeIdentifier]: nodeIdentifier,
            [TableKeys.removeValidator]: (
              <Icon
                className="BulkPurchaseConfirmationServicesModalFields__close-button"
                icon={IconType.close}
                onClick={handleRemoveValidator(nodeIdentifier)}
              />
            ),
            [TableKeys.status]: <ConnectionStatus status={formData.status} />,
          };
        }),
    [
      formValues,
      handleAmountChange,
      handleRemoveValidator,
      initialValidatorsData,
      orderedNodeIdentifiers,
      primaryValidator,
      submitting,
    ],
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

  const pvFee = useMemo(() => getPrimaryValidatorTxFee(primaryValidatorConfig, bankAddress), [
    bankAddress,
    primaryValidatorConfig,
  ]);

  const totalAmount = useMemo(
    () =>
      Object.values(formValues).reduce((sum, {amount, status}) => {
        if (amount && status === ValidatorConnectionStatus.connected) {
          return sum + parseInt(amount, 10);
        }
        return sum;
      }, 0),
    [formValues],
  );

  const totalValidators = useMemo(
    () =>
      Object.values(formValues).reduce((count, {amount}) => {
        if (amount) {
          return count + 1;
        }
        return count;
      }, 0),
    [formValues],
  );

  const totalTx = bankFee + pvFee + totalAmount;

  const totalExceedsAvailableBalance = totalTx > (bankBalance?.balance || 0);

  return (
    <div className="BulkPurchaseConfirmationServicesModalFields">
      <div className="BulkPurchaseConfirmationServicesModalFields__left">
        <PageTable
          alwaysExpanded
          className="BulkPurchaseConfirmationServicesModalFields__validator-table"
          items={pageTableItems}
        />
      </div>
      <div className="BulkPurchaseConfirmationServicesModalFields__right">
        <div className="BulkPurchaseConfirmationServicesModalFields__bank-address">{bankAddress}</div>
        <div className="BulkPurchaseConfirmationServicesModalFields__bank-nickname">{bank.nickname}</div>
        <table className="BulkPurchaseConfirmationServicesModalFields__summary-table">
          <tbody>
            <tr>
              <td>Account Balance</td>
              <td>{bankBalance?.balance.toLocaleString() || '-'}</td>
            </tr>
            <tr>
              <td>Active Bank Fee</td>
              <td>{bankFee?.toLocaleString() || '-'}</td>
            </tr>
            <tr>
              <td>Primary Validator Fee</td>
              <td>{pvFee.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{totalAmount.toLocaleString()}</td>
            </tr>
            <tr>
              <td>TOTAL Tx</td>
              <td>
                <strong className={clsx({'total-tx--error': totalExceedsAvailableBalance})}>
                  {totalTx.toLocaleString()}
                </strong>
              </td>
            </tr>
            <tr>
              <td>TOTAL Validators</td>
              <td>
                <strong>{totalValidators.toLocaleString()}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          className="BulkPurchaseConfirmationServicesModalFields__purchase-button"
          disabled={!totalAmount || submitting || totalExceedsAvailableBalance}
          onClick={totalAmount ? handleSubmit : noop}
        >
          {submitting ? <Loader /> : 'Purchase'}
        </Button>
      </div>
    </div>
  );
};

export default BulkPurchaseConfirmationServicesModalFields;
