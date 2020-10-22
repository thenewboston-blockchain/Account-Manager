import React, {FC, useCallback, useMemo, useState} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import Icon, {IconType} from '@renderer/components/Icon';
import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import {VALIDATOR_VALIDATORS} from '@renderer/constants';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BaseValidator, ManagedNode} from '@renderer/types';

import './ValidatorValidators.scss';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  rootAccountFile,
  rootAccountFileHash,
  seedBlockIdentifier,
  dailyConfirmationRate,
  trust,
}

interface ComponentProps {
  managedValidator?: ManagedNode;
}

const ValidatorValidators: FC<ComponentProps> = ({managedValidator}) => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: validatorValidators,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BaseValidator>(VALIDATOR_VALIDATORS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustValidator, setEditTrustValidator] = useState<BaseValidator | null>(null);

  const hasSigningKey = useMemo(() => !!managedValidator?.nid_signing_key.length, [managedValidator]);

  const handleEditTrustButton = useCallback(
    (validator: BaseValidator) => (): void => {
      setEditTrustValidator(validator);
      toggleEditTrustModal();
    },
    [setEditTrustValidator, toggleEditTrustModal],
  );

  const validatorValidatorsTableData = useMemo<PageTableData[]>(
    () =>
      validatorValidators.map((validator) => ({
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
          <div className="ValidatorValidators__trust-cell">
            {validator.trust}{' '}
            {hasSigningKey ? (
              <Icon
                className="ValidatorValidators__edit-trust-icon"
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
    [handleEditTrustButton, hasSigningKey, validatorValidators],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorValidatorsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.dailyConfirmationRate]: 'Daily Rate',
        [TableKeys.defaultTransactionFee]: 'Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'NID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
        [TableKeys.rootAccountFileHash]: 'Root Account File Hash',
        [TableKeys.rootAccountFile]: 'Root Account File',
        [TableKeys.seedBlockIdentifier]: 'Seed Block',
        [TableKeys.trust]: 'Trust',
        [TableKeys.version]: 'Version',
      },
      orderedKeys: [
        TableKeys.nodeIdentifier,
        TableKeys.accountNumber,
        TableKeys.ipAddress,
        TableKeys.port,
        TableKeys.protocol,
        TableKeys.version,
        TableKeys.defaultTransactionFee,
        TableKeys.rootAccountFile,
        TableKeys.rootAccountFileHash,
        TableKeys.seedBlockIdentifier,
        TableKeys.dailyConfirmationRate,
        TableKeys.trust,
      ],
    }),
    [validatorValidatorsTableData],
  );

  return (
    <div className="ValidatorValidators">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
      {editTrustModalIsOpen && !!editTrustValidator && !!managedValidator && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedValidator}
          targetIdentifier={editTrustValidator.node_identifier}
          targetType="validators"
          trust={editTrustValidator.trust}
        />
      )}
    </div>
  );
};

export default ValidatorValidators;
