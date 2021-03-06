import React, {FC, useCallback, useMemo, useState} from 'react';
import {Icon, IconType} from '@thenewboston/ui';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import EditTrustModal from '@renderer/containers/EditTrustModal';
import {BANK_ACCOUNTS} from '@renderer/constants/actions';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankAccount, ManagedNode} from '@renderer/types';
import {formatDate} from '@renderer/utils/dates';

import './BankAccounts.scss';

enum TableKeys {
  id,
  accountNumber,
  trust,
  createdDate,
  modifiedDate,
}

interface ComponentProps {
  managedBank?: ManagedNode;
}

const BankAccounts: FC<ComponentProps> = ({managedBank}) => {
  const address = useAddress();
  const [expanded, toggleExpanded] = useBooleanState(false);
  const {
    count,
    currentPage,
    loading,
    results: bankAccounts,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BankAccount>(BANK_ACCOUNTS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustAccount, setEditTrustAccount] = useState<BankAccount | null>(null);

  const hasSigningKey = useMemo(() => !!managedBank?.nid_signing_key.length, [managedBank]);

  const handleEditTrustButton = useCallback(
    (account: BankAccount) => (): void => {
      setEditTrustAccount(account);
      toggleEditTrustModal();
    },
    [setEditTrustAccount, toggleEditTrustModal],
  );

  const bankAccountsTableData = useMemo<PageTableData[]>(
    () =>
      bankAccounts.map((account) => ({
        key: account.account_number,
        [TableKeys.accountNumber]: <AccountLink accountNumber={account.account_number} expanded={expanded} />,
        [TableKeys.createdDate]: formatDate(account.created_date),
        [TableKeys.id]: <ExpandableText expanded={expanded} text={account.id} />,
        [TableKeys.modifiedDate]: formatDate(account.modified_date),
        [TableKeys.trust]: (
          <div className="BankAccounts__trust-cell">
            {account.trust}{' '}
            {hasSigningKey ? (
              <Icon
                className="BankAccounts__edit-trust-icon"
                icon={IconType.pencil}
                onClick={handleEditTrustButton(account)}
                size={15}
                totalSize={18}
              />
            ) : null}
          </div>
        ),
      })) || [],
    [bankAccounts, expanded, handleEditTrustButton, hasSigningKey],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankAccountsTableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.createdDate]: 'Created',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.trust]: 'Trust',
      },
      orderedKeys: [
        TableKeys.id,
        TableKeys.accountNumber,
        TableKeys.trust,
        TableKeys.createdDate,
        TableKeys.modifiedDate,
      ],
    }),
    [bankAccountsTableData],
  );

  return (
    <>
      <PaginatedTable
        className="BankAccounts"
        count={count}
        currentPage={currentPage}
        expanded={expanded}
        items={pageTableItems}
        loading={loading}
        setPage={setPage}
        toggleExpanded={toggleExpanded}
        totalPages={totalPages}
      />
      {editTrustModalIsOpen && !!editTrustAccount && !!managedBank && (
        <EditTrustModal
          close={toggleEditTrustModal}
          requestingNode={managedBank}
          targetIdentifier={editTrustAccount.account_number}
          targetType="accounts"
          trust={editTrustAccount.trust}
        />
      )}
    </>
  );
};

export default BankAccounts;
