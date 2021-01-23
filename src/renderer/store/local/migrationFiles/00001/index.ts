import {Balance, Dict, ManagedAccount} from '@renderer/types';
import {MigrationFunction} from '../../types';

export const removeBalanceFromManagedAccount = (managedAccount: ManagedAccount & Balance) => {
  return {
    account_number: managedAccount.account_number,
    nickname: managedAccount.nickname,
    signing_key: managedAccount.signing_key,
  };
};

export const removeBalanceFromStoreManagedAccounts: MigrationFunction = (localStore) => {
  const managedAccounts = (localStore.get('managed_accounts') as Dict<ManagedAccount & Balance>) || undefined;
  const updatedManagedAccounts: Dict<ManagedAccount> = managedAccounts
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
