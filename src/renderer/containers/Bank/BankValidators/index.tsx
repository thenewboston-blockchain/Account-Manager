import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import AccountLink from '@renderer/components/AccountLink';
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
  const {count, currentPage, loading, results: bankValidators, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BaseValidator
  >(BANK_VALIDATORS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustValidator, setEditTrustValidator] = useState<BaseValidator | null>(null);
  const [purchaseServicesModalIsOpen, togglePurchaseServicesModal] = useBooleanState(false);
  const [purchaseServicesValidator, setPurchaseServicesValidator] = useState<BaseValidator | null>(null);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

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
      if (activePrimaryValidator?.node_identifier === validator.node_identifier || !validator.daily_confirmation_rate) {
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
    [activePrimaryValidator, handlePurchaseServicesClick, hasSigningKey],
  );

  const bankValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      bankValidators.map((validator) => ({
        key: validator.node_identifier,
        [TableKeys.accountNumber]: <AccountLink accountNumber={validator.account_number} />,
        [TableKeys.dailyConfirmationRate]: renderValidatorDailyRate(validator),
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
                totalSize={18}
              />
            ) : null}
          </div>
        ),
        [TableKeys.version]: validator.version,
      })) || [],
    [bankValidators, handleEditTrustButton, hasSigningKey, renderValidatorDailyRate],
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
    <div className="BankValidators">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
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
        <PurchaseConfirmationServicesModal close={togglePurchaseServicesModal} validator={purchaseServicesValidator} />
      )}
    </div>
  );
};

export default BankValidators;
