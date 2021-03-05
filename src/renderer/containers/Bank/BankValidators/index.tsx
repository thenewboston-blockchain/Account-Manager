import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Icon, IconType} from '@thenewboston/ui';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import NodeLink from '@renderer/components/NodeLink';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import PurchaseConfirmationServicesModal from '@renderer/containers/PurchaseConfirmationServices/PurchaseConfirmationServicesModal';
import {BANK_VALIDATORS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {getPrimaryValidatorConfig} from '@renderer/selectors';
import {BaseValidator, ManagedNode} from '@renderer/types';

import './BankValidators.scss';

enum TableKeys {
  accountNumber,
  dailyConfirmationRate,
  defaultTransactionFee,
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
  managedBank?: ManagedNode;
}

const BankValidators: FC<ComponentProps> = ({managedBank}) => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
  const {
    count,
    currentPage,
    loading,
    results: bankValidators,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BaseValidator>(BANK_VALIDATORS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustValidator, setEditTrustValidator] = useState<BaseValidator | null>(null);
  const [purchaseServicesModalIsOpen, togglePurchaseServicesModal] = useBooleanState(false);
  const [purchaseServicesValidator, setPurchaseServicesValidator] = useState<BaseValidator | null>(null);
  const primaryValidator = useSelector(getPrimaryValidatorConfig);

  const handleEditTrustButton = useCallback(
    (validator: BaseValidator) => (): void => {
      setEditTrustValidator(validator);
      toggleEditTrustModal();
    },
    [setEditTrustValidator, toggleEditTrustModal],
  );

  const handlePurchaseServicesClick = useCallback(
    (validator: BaseValidator) => (): void => {
      setPurchaseServicesValidator(validator);
      togglePurchaseServicesModal();
    },
    [setPurchaseServicesValidator, togglePurchaseServicesModal],
  );

  const hasSigningKey = useMemo(() => !!managedBank?.nid_signing_key.length, [managedBank]);

  const renderValidatorDailyRate = useCallback(
    (validator) => {
      if (primaryValidator?.node_identifier === validator.node_identifier || !validator.daily_confirmation_rate) {
        return '-';
      }
      return hasSigningKey ? (
        <span className="BankValidators__clickable-text" onClick={handlePurchaseServicesClick(validator)}>
          {validator.daily_confirmation_rate}
        </span>
      ) : (
        validator.daily_confirmation_rate
      );
    },
    [handlePurchaseServicesClick, hasSigningKey, primaryValidator],
  );

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: <AccountLink accountNumber={validator.account_number} expanded={expanded} />,
        [TableKeys.dailyConfirmationRate]: renderValidatorDailyRate(validator),
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={validator} urlBase="validator" />,
        [TableKeys.nodeIdentifier]: <ExpandableText expanded={expanded} text={validator.node_identifier} />,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.rootAccountFileHash]: <ExpandableText expanded={expanded} text={validator.root_account_file_hash} />,
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
                totalSize={18}
              />
            ) : null}
          </div>
        ),
        [TableKeys.version]: validator.version,
      })) || [],
    [bankValidators, expanded, handleEditTrustButton, hasSigningKey, renderValidatorDailyRate],
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
      ],
    }),
    [bankValidatorsTableData],
  );

  return (
    <>
      <PaginatedTable
        className="BankValidators"
        count={count}
        currentPage={currentPage}
        expanded={expanded}
        items={pageTableItems}
        loading={loading}
        setPage={setPage}
        toggleExpanded={toggleExpanded}
        totalPages={totalPages}
      />
      {editTrustModalIsOpen && !!editTrustValidator && !!managedBank && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedBank}
          targetIdentifier={editTrustValidator.node_identifier}
          targetType="validators"
          trust={editTrustValidator.trust}
        />
      )}
      {purchaseServicesModalIsOpen && !!purchaseServicesValidator && (
        <PurchaseConfirmationServicesModal
          initialBankAddress={address}
          close={togglePurchaseServicesModal}
          validator={purchaseServicesValidator}
        />
      )}
    </>
  );
};

export default BankValidators;
