import React, {FC, useCallback, useMemo, useState} from 'react';
import {Icon, IconType} from '@thenewboston/ui';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import NodeLink from '@renderer/components/NodeLink';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import {VALIDATOR_VALIDATORS} from '@renderer/constants/actions';
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
  const [expanded, toggleExpanded] = useBooleanState(false);
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
        [TableKeys.accountNumber]: <AccountLink accountNumber={validator.account_number} expanded={expanded} />,
        [TableKeys.dailyConfirmationRate]: validator.daily_confirmation_rate,
        [TableKeys.defaultTransactionFee]: validator.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={validator} urlBase="validator" />,
        [TableKeys.nodeIdentifier]: <ExpandableText expanded={expanded} text={validator.node_identifier} />,
        [TableKeys.port]: validator.port,
        [TableKeys.protocol]: validator.protocol,
        [TableKeys.rootAccountFileHash]: <ExpandableText expanded={expanded} text={validator.root_account_file_hash} />,
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
    [expanded, handleEditTrustButton, hasSigningKey, validatorValidators],
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
    <>
      <PaginatedTable
        className="ValidatorValidators"
        count={count}
        currentPage={currentPage}
        expanded={expanded}
        items={pageTableItems}
        loading={loading}
        setPage={setPage}
        toggleExpanded={toggleExpanded}
        totalPages={totalPages}
      />
      {editTrustModalIsOpen && !!editTrustValidator && !!managedValidator && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedValidator}
          targetIdentifier={editTrustValidator.node_identifier}
          targetType="validators"
          trust={editTrustValidator.trust}
        />
      )}
    </>
  );
};

export default ValidatorValidators;
