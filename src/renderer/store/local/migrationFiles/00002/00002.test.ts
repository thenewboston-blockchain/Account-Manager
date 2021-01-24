import TestElectronStore from '@renderer/models/store/TestElectronStore';
import {Dict} from '@renderer/types';
import {
  findFriendAccountNumbersThatAreManagedAccounts,
  filterOutFriends,
  ManagedAccount,
  ManagedFriend,
  removeFriendThatIsAManagedAccount,
} from './index';

const accountNumber1 = 'test123';
const nickname1 = 'nickname 1';
const signingKey1 = 'signing key 1';
const managedAccount1: ManagedAccount = {
  account_number: accountNumber1,
  nickname: nickname1,
  signing_key: signingKey1,
};

const accountNumber2 = 'test456';
const nickname2 = 'nickname 2';
const signingKey2 = 'signing key 2';
const managedAccount2: ManagedAccount = {
  account_number: accountNumber2,
  nickname: nickname2,
  signing_key: signingKey2,
};

const friendAccountNumber1 = 'friend-test123';
const friendNickname1 = 'friend nickname 1';
const managedFriend1: ManagedFriend = {
  account_number: friendAccountNumber1,
  nickname: friendNickname1,
};

const friendAccountNumber2 = 'friend-test456';
const friendNickname2 = 'friend nickname 2';
const managedFriend2: ManagedFriend = {
  account_number: friendAccountNumber2,
  nickname: friendNickname2,
};

const defaultManagedAccounts: Dict<ManagedAccount> = {
  [accountNumber1]: managedAccount1,
  [accountNumber2]: managedAccount2,
};

const defaultManagedFriends: Dict<ManagedFriend> = {
  [friendAccountNumber1]: managedFriend1,
  [friendAccountNumber2]: managedFriend2,
};

const testLocalStore = new TestElectronStore();

describe('migrationFunction2', () => {
  describe('findFriendAccountNumbersThatAreManagedAccounts', () => {
    test('works when managedFriends is empty', () => {
      const managedFriends: Dict<ManagedFriend> = {};

      const friendAccountNumbers = findFriendAccountNumbersThatAreManagedAccounts(
        managedFriends,
        defaultManagedAccounts,
      );

      expect(friendAccountNumbers.length).toBe(0);
    });

    test('works when managedAccounts is empty', () => {
      const managedAccounts: Dict<ManagedAccount> = {};

      const friendAccountNumbers = findFriendAccountNumbersThatAreManagedAccounts(
        defaultManagedFriends,
        managedAccounts,
      );

      expect(friendAccountNumbers.length).toBe(0);
    });

    test('finds 1 friendAccount', () => {
      const managedFriends: Dict<ManagedFriend> = {
        ...defaultManagedFriends,
        [accountNumber1]: {
          account_number: accountNumber1,
          nickname: 'testing',
        },
      };

      const friendAccountNumbers = findFriendAccountNumbersThatAreManagedAccounts(
        managedFriends,
        defaultManagedAccounts,
      );

      expect(friendAccountNumbers.length).toBe(1);
      expect(friendAccountNumbers.includes(accountNumber1)).toBeTruthy();
      expect(friendAccountNumbers.includes(accountNumber2)).toBeFalsy();
      expect(friendAccountNumbers.includes(friendAccountNumber1)).toBeFalsy();
      expect(friendAccountNumbers.includes(friendAccountNumber2)).toBeFalsy();
    });

    test('finds multiple friendAccounts', () => {
      const managedFriends: Dict<ManagedFriend> = {
        ...defaultManagedFriends,
        [accountNumber1]: {
          account_number: accountNumber1,
          nickname: 'testing',
        },
        [accountNumber2]: {
          account_number: accountNumber2,
          nickname: 'testing 2',
        },
      };

      const friendAccountNumbers = findFriendAccountNumbersThatAreManagedAccounts(
        managedFriends,
        defaultManagedAccounts,
      );

      expect(friendAccountNumbers.length).toBe(2);
      expect(friendAccountNumbers.includes(accountNumber1)).toBeTruthy();
      expect(friendAccountNumbers.includes(accountNumber2)).toBeTruthy();
      expect(friendAccountNumbers.includes(friendAccountNumber1)).toBeFalsy();
      expect(friendAccountNumbers.includes(friendAccountNumber2)).toBeFalsy();
    });

    test('finds 0 when no overlap', () => {
      const friendAccountNumbers = findFriendAccountNumbersThatAreManagedAccounts(
        defaultManagedFriends,
        defaultManagedAccounts,
      );

      expect(friendAccountNumbers.length).toBe(0);
    });
  });

  describe('filterOutFriends', () => {
    const defaultAccountNumbersToRemove = [friendAccountNumber1, friendAccountNumber2];

    test('works when managedFriends is empty', () => {
      const managedFriends: Dict<ManagedFriend> = {};
      const updatedManagedFriends = filterOutFriends(managedFriends, defaultAccountNumbersToRemove);

      expect(Object.keys(updatedManagedFriends).length).toBe(0);
    });

    test('works when accountNumbersToRemove is empty', () => {
      const accountNumbersToRemove: string[] = [];
      const updatedManagedFriends = filterOutFriends(defaultManagedFriends, accountNumbersToRemove);

      expect(Object.keys(updatedManagedFriends).length).toBe(Object.keys(defaultManagedFriends).length);
    });

    test('filters out friends correctly', () => {
      const accountNumbersToRemove: string[] = [friendAccountNumber1];
      const updatedManagedFriends = filterOutFriends(defaultManagedFriends, accountNumbersToRemove);

      expect(Object.keys(updatedManagedFriends).length).toBe(1);
      expect(updatedManagedFriends[friendAccountNumber1]).toBeUndefined();
      expect(updatedManagedFriends[friendAccountNumber2]).toBeTruthy();
    });

    test('leaves managedFriends alone when no intersection', () => {
      const accountNumbersToRemove: string[] = [accountNumber1, accountNumber2];
      expect(Object.keys(defaultManagedFriends).length).toBe(2);
      const updatedManagedFriends = filterOutFriends(defaultManagedFriends, accountNumbersToRemove);

      expect(Object.keys(updatedManagedFriends).length).toBe(2);
      expect(updatedManagedFriends[friendAccountNumber1]).toBeTruthy();
      expect(updatedManagedFriends[friendAccountNumber2]).toBeTruthy();
      expect(updatedManagedFriends[accountNumber1]).toBeFalsy();
      expect(updatedManagedFriends[accountNumber2]).toBeFalsy();
    });
  });

  describe('removeFriendThatIsAManagedAccount', () => {
    beforeEach(() => {
      testLocalStore.clear();
    });

    afterEach(() => {
      testLocalStore.clear();
    });

    test('successfully removes duplicate account from friends', () => {
      testLocalStore.set('managed_accounts', defaultManagedAccounts);
      testLocalStore.set('managed_friends', {
        ...defaultManagedFriends,
        [accountNumber1]: {
          account_number: accountNumber1,
          nickname: 'testing',
        },
      });

      expect(Object.keys(testLocalStore.get('managed_accounts')).length).toBe(2);
      expect(Object.keys(testLocalStore.get('managed_friends')).length).toBe(3);

      removeFriendThatIsAManagedAccount(testLocalStore);

      expect(Object.keys(testLocalStore.get('managed_accounts')).length).toBe(2);
      expect(testLocalStore.get('managed_accounts')[accountNumber1]).toBeTruthy();

      expect(Object.keys(testLocalStore.get('managed_friends')).length).toBe(2);
      expect(testLocalStore.get('managed_friends')[accountNumber1]).toBeFalsy();
      expect(testLocalStore.get('managed_friends')[friendAccountNumber1]).toBeTruthy();
      expect(testLocalStore.get('managed_friends')[friendAccountNumber2]).toBeTruthy();
    });
  });
});
