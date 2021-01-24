import TestElectronStore from '@renderer/models/store/TestElectronStore';
import {OldManagedAccount, removeBalanceFromManagedAccount, removeBalanceFromStoreManagedAccounts} from './index';

const accountNumber1 = 'test123';
const balance1 = 111;
const nickname1 = 'nickname 1';
const signingKey1 = 'signing key 1';
const oldManagedAccount1: OldManagedAccount = {
  account_number: accountNumber1,
  balance: balance1,
  nickname: nickname1,
  signing_key: signingKey1,
};

const accountNumber2 = 'test456';
const balance2 = 222;
const nickname2 = 'nickname 2';
const signingKey2 = 'signing key 2';
const oldManagedAccount2: OldManagedAccount = {
  account_number: accountNumber2,
  balance: balance2,
  nickname: nickname2,
  signing_key: signingKey2,
};

const testLocalStore = new TestElectronStore();

describe('migrationFunction1', () => {
  describe('removeBalanceFromManagedAccount', () => {
    test('removes balance from managedAccount', () => {
      const updatedManagedAccount = removeBalanceFromManagedAccount(oldManagedAccount1);

      expect(Object.keys(updatedManagedAccount).length).toBe(3);
      expect(updatedManagedAccount.account_number).toBe(oldManagedAccount1.account_number);
      expect(updatedManagedAccount.nickname).toBe(oldManagedAccount1.nickname);
      expect(updatedManagedAccount.signing_key).toBe(oldManagedAccount1.signing_key);
      expect((updatedManagedAccount as any).balance).toBeUndefined();
    });
  });

  describe('removeBalanceFromStoreManagedAccounts', () => {
    beforeEach(() => {
      testLocalStore.clear();
    });

    afterEach(() => {
      testLocalStore.clear();
    });

    test(`successfully removes balance from store's managedAccount`, () => {
      testLocalStore.set('managed_accounts', {
        [accountNumber1]: oldManagedAccount1,
        [accountNumber2]: oldManagedAccount2,
      });

      removeBalanceFromStoreManagedAccounts(testLocalStore);
      const updatedManagedAccounts = testLocalStore.get('managed_accounts');

      expect(Object.keys(updatedManagedAccounts).length).toBe(2);
      expect(Object.keys(updatedManagedAccounts[accountNumber1]).length).toBe(3);
      expect(updatedManagedAccounts[accountNumber1].balance).toBeUndefined();
      expect(Object.keys(updatedManagedAccounts[accountNumber2]).length).toBe(3);
      expect(updatedManagedAccounts[accountNumber2].balance).toBeUndefined();
    });

    test(`logic works for when you don't have any managedAccounts`, () => {
      testLocalStore.set('managed_accounts', {});

      removeBalanceFromStoreManagedAccounts(testLocalStore);
      const updatedManagedAccounts = testLocalStore.get('managed_accounts');

      expect(Object.keys(updatedManagedAccounts).length).toBe(0);
    });

    test(`logic works for when managedAccounts is undefined`, () => {
      testLocalStore.set('managed_accounts', undefined);

      removeBalanceFromStoreManagedAccounts(testLocalStore);
      const updatedManagedAccounts = testLocalStore.get('managed_accounts');

      expect(Object.keys(updatedManagedAccounts).length).toBe(0);
    });
  });
});
