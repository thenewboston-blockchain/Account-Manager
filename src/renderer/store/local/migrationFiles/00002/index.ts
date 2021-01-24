import omit from 'lodash/omit';
import {Dict, MigrationFunction} from '@renderer/types';

export interface ManagedAccount {
  account_number: string;
  nickname: string;
  signing_key: string;
}

export interface ManagedFriend {
  account_number: string;
  nickname: string;
}

export const findFriendAccountNumbersThatAreManagedAccounts = (
  managedFriends: Dict<ManagedFriend>,
  managedAccounts: Dict<ManagedAccount>,
): string[] => {
  const managedAccountNumbers = Object.values(managedAccounts).map((managedAccount) => managedAccount.account_number);

  return Object.values(managedFriends)
    .filter((managedFriend) => managedAccountNumbers.includes(managedFriend.account_number))
    .map((managedFriend) => managedFriend.account_number);
};

export const filterOutFriends = (
  managedFriends: Dict<ManagedFriend>,
  accountNumbersToRemove: string[],
): Dict<ManagedFriend> => {
  return omit(managedFriends, accountNumbersToRemove);
};

export const removeFriendThatIsAManagedAccount: MigrationFunction = (localStore) => {
  const managedAccounts = localStore.get('managed_accounts') || undefined;
  const managedFriends = localStore.get('managed_friends') || undefined;

  if (!managedAccounts || !managedFriends) return;

  const accountNumbersToRemove = findFriendAccountNumbersThatAreManagedAccounts(managedFriends, managedAccounts);
  const updatedManagedFriends = filterOutFriends(managedFriends, accountNumbersToRemove);

  localStore.set('managed_friends', updatedManagedFriends);
};

const migrationFunction: MigrationFunction = (localStore) => {
  // removes a friend if that friend was already a managedAccount
  removeFriendThatIsAManagedAccount(localStore);
};

export default migrationFunction;
