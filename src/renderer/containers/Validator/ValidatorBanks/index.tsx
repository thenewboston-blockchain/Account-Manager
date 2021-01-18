import React, {FC, useCallback, useMemo, useState} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import Icon, {IconType} from '@renderer/components/Icon';
import NodeLink from '@renderer/components/NodeLink';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import {VALIDATOR_BANKS} from '@renderer/constants';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {ManagedNode, Node, ValidatorBank} from '@renderer/types';

import './ValidatorBanks.scss';

enum TableKeys {
  nodeIdentifier,
  accountNumber,
  ipAddress,
  port,
  protocol,
  version,
  defaultTransactionFee,
  confirmationExpiration,
  trust,
}

interface ComponentProps {
  managedValidator?: ManagedNode;
}

const ValidatorBanks: FC<ComponentProps> = ({managedValidator}) => {
  const address = useAddress();
  const {
    count,
    currentPage,
    loading,
    results: validatorBanks,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<ValidatorBank>(VALIDATOR_BANKS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustBank, setEditTrustBank] = useState<Node | null>(null);

  const hasSigningKey = useMemo(() => !!managedValidator?.nid_signing_key.length, [managedValidator]);

  const handleEditTrustButton = useCallback(
    (bank: ValidatorBank) => (): void => {
      setEditTrustBank(bank);
      toggleEditTrustModal();
    },
    [setEditTrustBank, toggleEditTrustModal],
  );

  const validatorAccountsTableData = useMemo<PageTableData[]>(
    () =>
      validatorBanks.map((bank) => ({
        key: bank.node_identifier,
        [TableKeys.accountNumber]: <AccountLink accountNumber={bank.account_number} />,
        [TableKeys.confirmationExpiration]: bank.confirmation_expiration,
        [TableKeys.defaultTransactionFee]: bank.default_transaction_fee,
        [TableKeys.ipAddress]: <NodeLink node={bank} urlBase="bank" />,
        [TableKeys.nodeIdentifier]: bank.node_identifier,
        [TableKeys.port]: bank.port,
        [TableKeys.protocol]: bank.protocol,
        [TableKeys.trust]: (
          <div className="ValidatorBanks__trust-cell">
            {bank.trust}{' '}
            {hasSigningKey ? (
              <Icon
                className="ValidatorBanks__edit-trust-icon"
                icon={IconType.pencil}
                onClick={handleEditTrustButton(bank)}
                size={15}
                totalSize={18}
              />
            ) : null}
          </div>
        ),
        [TableKeys.version]: bank.version,
      })) || [],
    [handleEditTrustButton, hasSigningKey, validatorBanks],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: validatorAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.confirmationExpiration]: 'Confirmation Expiration',
        [TableKeys.defaultTransactionFee]: 'Tx Fee',
        [TableKeys.ipAddress]: 'IP Address',
        [TableKeys.nodeIdentifier]: 'NID',
        [TableKeys.port]: 'Port',
        [TableKeys.protocol]: 'Protocol',
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
        TableKeys.confirmationExpiration,
        TableKeys.trust,
      ],
    }),
    [validatorAccountsTableData],
  );

  return (
    <div className="ValidatorBanks">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
      {editTrustModalIsOpen && !!editTrustBank && !!managedValidator && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedValidator}
          targetIdentifier={editTrustBank.node_identifier}
          targetType="banks"
          trust={editTrustBank.trust}
        />
      )}
    </div>
  );
};

export default ValidatorBanks;
