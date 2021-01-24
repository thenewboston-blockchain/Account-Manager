import TestElectronStore from '@renderer/models/store/TestElectronStore';
import {addPortToManagedNodes, addPortPropertyToStore, deleteSocketsPropertyFromStore, OldManagedNode} from './index';

const defaultIpAddress = '1.1.1.1';
const defaultProtocol = 'http';

const defaultAddress = `${defaultProtocol}://${defaultIpAddress}`;

const defaultManagedNode: OldManagedNode = {
  account_signing_key: '',
  ip_address: defaultIpAddress,
  nickname: 'test',
  nid_signing_key: '',
  port: 80,
  protocol: defaultProtocol,
};

const testLocalStore = new TestElectronStore();

describe('migrationFunction0', () => {
  describe('addPortToManagedNodes', () => {
    test('updates address key if no port is provided', () => {
      const testManagedNodes = {
        [defaultAddress]: {
          ...defaultManagedNode,
        },
      };
      const updatedManagedNodes = addPortToManagedNodes(testManagedNodes);
      const updatedKeys = Object.keys(updatedManagedNodes);
      expect(updatedKeys.length).toBe(1);
      expect(updatedKeys[0]).toBe(`${defaultAddress}:80`);
      expect(updatedKeys[0]).not.toBe(defaultAddress);
    });

    test('leaves address key alone if port is provided', () => {
      const testAddress = `${defaultAddress}:8080`;
      const testManagedNodes = {
        [testAddress]: {
          ...defaultManagedNode,
          port: 8080,
        },
      };
      const updatedManagedNodes = addPortToManagedNodes(testManagedNodes);
      const updatedKeys = Object.keys(updatedManagedNodes);
      expect(updatedKeys.length).toBe(1);
      expect(updatedKeys[0]).toBe(testAddress);
    });

    test('updates port field if it was null', () => {
      const testManagedNodes = {
        [`${defaultAddress}`]: {
          ...defaultManagedNode,
          port: null as any,
        },
      };
      const updatedManagedNodes = addPortToManagedNodes(testManagedNodes);
      const updatedValues = Object.values(updatedManagedNodes);
      expect(updatedValues.length).toBe(1);
      expect(updatedValues[0].port).toBe(80);
    });

    test('leaves port field alone if it was not null', () => {
      const testPort = 6789;
      const testManagedNodes = {
        [`${defaultAddress}:${testPort}`]: {
          ...defaultManagedNode,
          port: testPort,
        },
      };
      const updatedManagedNodes = addPortToManagedNodes(testManagedNodes);
      const updatedValues = Object.values(updatedManagedNodes);
      expect(updatedValues.length).toBe(1);
      expect(updatedValues[0].port).toBe(testPort);
    });
  });

  describe('addPortPropertyToStore', () => {
    beforeEach(() => {
      testLocalStore.clear();
      testLocalStore.set({
        managed_banks: {
          [defaultAddress]: {
            ...defaultManagedNode,
          },
        },
        managed_validators: {
          [defaultAddress]: {
            ...defaultManagedNode,
          },
        },
      });
    });

    afterEach(() => {
      testLocalStore.clear();
    });

    test('updates managedBanks if no port provided', () => {
      expect(testLocalStore.store.managed_banks[defaultAddress]).toBeTruthy();
      addPortPropertyToStore(testLocalStore);
      expect(testLocalStore.store.managed_banks[defaultAddress]).toBeFalsy();
      expect(testLocalStore.store.managed_banks[`${defaultAddress}:80`]).toBeTruthy();
    });

    test('updates managedValidators if no port provided', () => {
      expect(testLocalStore.store.managed_validators[defaultAddress]).toBeTruthy();
      addPortPropertyToStore(testLocalStore);
      expect(testLocalStore.store.managed_validators[defaultAddress]).toBeFalsy();
      expect(testLocalStore.store.managed_validators[`${defaultAddress}:80`]).toBeTruthy();
    });
  });

  describe('deleteSocketsPropertyFromStore', () => {
    beforeEach(() => {
      testLocalStore.clear();
      testLocalStore.set({sockets: {}} as any);
    });

    afterEach(() => {
      testLocalStore.clear();
    });

    test('deletes sockets from store', () => {
      expect((testLocalStore.store as any).sockets).toBeTruthy();
      deleteSocketsPropertyFromStore(testLocalStore);
      expect((testLocalStore.store as any).sockets).toBeFalsy();
    });
  });
});
