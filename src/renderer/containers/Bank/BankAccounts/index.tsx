import React, {FC, useCallback, useMemo, useState} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import Icon, {IconType} from '@renderer/components/Icon';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import EditTrustModal from '@renderer/containers/App/EditTrustModal';
import {BANK_ACCOUNTS} from '@renderer/constants';
import {useAddress, useBooleanState, usePaginatedNetworkDataFetcher} from '@renderer/hooks';
import {BankAccount, ManagedNode} from '@renderer/types';

import './BankAccounts.scss';

enum TableKeys {
  id,
  accountNumber,
  trust,
  createdDate,
  modifiedDate,
}

interface ComponentProps {
  managedBank: ManagedNode;
}

const BankAccounts: FC<ComponentProps> = ({managedBank}) => {
  const address = useAddress();
  const {count, currentPage, loading, results: bankAccounts, setPage, totalPages} = usePaginatedNetworkDataFetcher<
    BankAccount
  >(BANK_ACCOUNTS, address);
  const [editTrustModalIsOpen, toggleEditTrustModal] = useBooleanState(false);
  const [editTrustAccount, setEditTrustAccount] = useState<BankAccount | null>(null);

  const hasSigningKey = useMemo(() => !!managedBank.signing_key.length, [managedBank]);

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
        [TableKeys.accountNumber]: <AccountLink accountNumber={account.account_number} />,
        [TableKeys.createdDate]: account.created_date,
        [TableKeys.id]: account.id,
        [TableKeys.modifiedDate]: account.modified_date,
        [TableKeys.trust]: (
          <div className="BankAccounts__trust-cell">
            {account.trust}{' '}
            <Icon
              className="BankAccounts__edit-trust-icon"
              disabled={!hasSigningKey}
              icon={IconType.pencil}
              onClick={handleEditTrustButton(account)}
              size={15}
            />
          </div>
        ),
      })) || [],
    [bankAccounts, handleEditTrustButton, hasSigningKey],
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
    <div className="BankAccounts">
      <PageTable count={count} currentPage={currentPage} items={pageTableItems} loading={loading} />
      <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
      {editTrustModalIsOpen && !!editTrustAccount && (
        <EditTrustModal
          close={toggleEditTrustModal}
          node={managedBank}
          nodeIdentifier={editTrustAccount.account_number}
          trust={editTrustAccount.trust}
          type="accounts"
        />
      )}
    </div>
  );
};

export default BankAccounts;
