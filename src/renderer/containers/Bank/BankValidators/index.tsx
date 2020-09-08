import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import AccountLink from '@renderer/components/AccountLink';
import DropdownMenuButton, {DropdownMenuDirection} from '@renderer/components/DropdownMenuButton';
import Icon, {IconType} from '@renderer/components/Icon';
import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import PurchaseConfirmationServicesModal from '@renderer/containers/PurchaseConfirmationServicesModal';
import {BANK_VALIDATORS} from '@renderer/constants';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';
import {BaseValidator, ManagedNode} from '@renderer/types';

import './BankValidators.scss';

enum TableKeys {
  accountNumber,
  dailyConfirmationRate,
  defaultTransactionFee,
  dropdownMenu,
  ipAddress,
  nodeIdentifier,
  port,
  protocol,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  trust,
  version,
}

interface ComponentProps {
  managedBank: ManagedNode;
}

const BankValidators: FC<ComponentProps> = ({managedBank}) => {
  const address = useAddress();
  const {count, currentPage, loading, results: bankValidators, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BaseValidator
  >(BANK_VALIDATORS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustValidator, setEditTrustValidator] = useState<BaseValidator | null>(null);
  const [purchaseServicesModalIsOpen, togglePurchaseServicesModal] = useBooleanState(false);
  const [purchaseServicesValidator, setPurchaseServicesValidator] = useState<BaseValidator | null>(null);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

  const handlePurchaseServicesClick = useCallback(
    (validator: BaseValidator) => (): void => {
      setPurchaseServicesValidator(validator);
      togglePurchaseServicesModal();
    },
    [setPurchaseServicesValidator, togglePurchaseServicesModal],
  );

  const getMenuOptions = useCallback(
    (validator: BaseValidator) => {
      return [
        {
          label: 'Purchase Confirmation Services',
          onClick: handlePurchaseServicesClick(validator),
        },
      ];
    },
    [handlePurchaseServicesClick],
  );

  const hasSigningKey = useMemo(() => !!managedBank.signing_key.length, [managedBank]);

  const handleEditTrustButton = useCallback(
    (validator: BaseValidator) => (): void => {
      setEditTrustValidator(validator);
      toggleEditTrustModal();
    },
    [setEditTrustValidator, toggleEditTrustModal],
  );

  const renderValidatorDropdownMenu = useCallback(
    (validator) => {
      if (activePrimaryValidator?.node_identifier === validator.node_identifier) return ' ';
      return (
        <DropdownMenuButton
          className="BankValidators__DropdownMenuButton"
          direction={DropdownMenuDirection.left}
          options={getMenuOptions(validator)}
        />
      );
    },
    [activePrimaryValidator, getMenuOptions],
  );

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: <AccountLink accountNumber={validator.account_number} />,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={validator} urlBase="validator" />,
        [TableKeys.nodeIdentifier]: validator.node_identifier,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.rootAccountFileHash]: validator.root_account_file_hash,
        [TableKeys.rootAccountFile]: validator.root_account_file,
        [TableKeys.seedBlockIdentifier]: validator.seed_block_identifier,
        [TableKeys.trust]: (
          <div className="BankValidators__trust-cell">
            {validator.trust}{' '}
            {hasSigningKey ? (
              <Icon
                className="BankValidators__edit-trust-icon"
                icon={IconType.pencil}
                onClick={handleEditTrustButton(validator)}
                size={15}
              />
            ) : null}
          </div>
        ),
        [TableKeys.version]: validator.version,
        [TableKeys.dropdownMenu]: renderValidatorDropdownMenu(validator),
      })) || [],
    [bankValidators, handleEditTrustButton, hasSigningKey, renderValidatorDropdownMenu],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankValidatorsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.dailyConfirmationRate]: 'Daily Rate',
        [TableKeys.defaultTransactionFee]: 'Tx Fee',
        [TableKeys.dropdownMenu]: ' ',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'Network ID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
        [TableKeys.rootAccountFile]: 'Root Account File',
        [TableKeys.seedBlockIdentifier]: 'Seed Block Identifier',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.accountNumber,
        TableKeys.defaultTransactionFee,
        TableKeys.protocol,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.dailyConfirmationRate,
        TableKeys.rootAccountFile,
        TableKeys.rootAccountFileHash,
        TableKeys.seedBlockIdentifier,
        TableKeys.trust,
        TableKeys.version,
        TableKeys.dropdownMenu,
      ],
    }),
    [bankValidatorsTableData],
  );

  return (
    <div className="BankValidators">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
      {editTrustModalIsOpen && !!editTrustValidator && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedBank}
          targetIdentifier={editTrustValidator.node_identifier}
          targetType="validators"
          trust={editTrustValidator.trust}
        />
      )}
      {purchaseServicesModalIsOpen && !!purchaseServicesValidator && (
        <PurchaseConfirmationServicesModal close={togglePurchaseServicesModal} validator={purchaseServicesValidator} />
      )}
    </div>
  );
};

export default BankValidators;
