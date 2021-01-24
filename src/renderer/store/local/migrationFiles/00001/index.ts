import {Dict, MigrationFunction} from '@renderer/types';

export interface OldManagedAccount {
  account_number: string;
  balance: number;
  nickname: string;
  signing_key: string;
}

export interface NewManagedAccount {
  account_number: string;
  nickname: string;
  signing_key: string;
}

export const removeBalanceFromManagedAccount = (managedAccount: OldManagedAccount): NewManagedAccount => {
  return {
    account_number: managedAccount.account_number,
    nickname: managedAccount.nickname,
    signing_key: managedAccount.signing_key,
  };
};

export const removeBalanceFromStoreManagedAccounts: MigrationFunction = (localStore) => {
  const managedAccounts = (localStore.get('managed_accounts') as Dict<OldManagedAccount>) || undefined;
  const updatedManagedAccounts: Dict<NewManagedAccount> = managedAccounts
    ? Object.values(managedAccounts).reduce((acc, managedAccount) => {
        return {
          ...acc,
          [managedAccount.account_number]: removeBalanceFromManagedAccount(managedAccount),
        };
      }, {})
    : {};
  localStore.set('managed_accounts', updatedManagedAccounts);
};

const migrationFunction: MigrationFunction = (localStore) => {
  // removes balance field from managed accounts
  removeBalanceFromStoreManagedAccounts(localStore);
};

export default migrationFunction;
