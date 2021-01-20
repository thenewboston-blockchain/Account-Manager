/* eslint-disable func-names */

import ElectronStore from 'electron-store';
import {addPortToManagedNodes, addPortPropertyToStore, deleteSocketsPropertyFromStore} from './index';

const defaultIpAddress = '1.1.1.1';
const defaultProtocol = 'http';

const defaultManagedNode = {
  account_signing_key: '',
  ip_address: defaultIpAddress,
  nickname: 'test',
  nid_signing_key: '',
  port: null,
  protocol: defaultProtocol,
};

describe('migrationFunction0', () => {
  describe('addPortToManagedNodes', () => {
    test('updates address key if no port is provided', () => {
      const testManagedNodes = {
        [`${defaultProtocol}://${defaultIpAddress}`]: {
          ...defaultManagedNode,
        },
      };
      const updatedManagedNodes = addPortToManagedNodes(testManagedNodes);
      const updatedKeys = Object.keys(updatedManagedNodes);
      expect(updatedKeys.length).toBe(1);
      expect(updatedKeys[0]).toBe(`${defaultProtocol}://${defaultIpAddress}:80`);
      expect(updatedKeys[0]).not.toBe(`${defaultProtocol}://${defaultIpAddress}`);
    });

    test('leaves address key alone if port is provided', () => {
      const testAddress = `${defaultProtocol}://${defaultIpAddress}:8080`;
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
        [`${defaultProtocol}://${defaultIpAddress}`]: {
          ...defaultManagedNode,
          port: null,
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
        [`${defaultProtocol}://${defaultIpAddress}:${testPort}`]: {
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

  // describe('addPortPropertyToStore', () => {
  //   const testAddress = `${defaultProtocol}://${defaultIpAddress}`;
  //   let testLocalStore;
  //
  //   beforeEach(() => {
  //     testLocalStore = new ElectronStore({name: 'test'});
  //     testLocalStore.clear();
  //     testLocalStore.set({
  //       managed_banks: {
  //         [testAddress]: {
  //           ...defaultManagedNode,
  //         },
  //       },
  //       managed_validators: {
  //         [testAddress]: {
  //           ...defaultManagedNode,
  //         },
  //       },
  //     });
  //   });
  //
  //   afterEach(() => {
  //     testLocalStore.clear();
  //   });
  //
  //   test('updates managedBanks if no port provided', () => {
  //     expect(testLocalStore.store.managed_banks[testAddress]).toBeTruthy();
  //     const updatedLocalStore = addPortPropertyToStore(testLocalStore);
  //     expect(updatedLocalStore.store.managed_banks[testAddress]).toBeFalsy();
  //     expect(updatedLocalStore.store.managed_banks[`$${testAddress}:80`]).toBeTruthy();
  //   });
  //
  //   test('updates managedValidators if no port provided', () => {
  //     expect(testLocalStore.store.managed_validators[testAddress]).toBeTruthy();
  //     const updatedLocalStore = addPortPropertyToStore(testLocalStore);
  //     expect(updatedLocalStore.store.managed_validators[testAddress]).toBeFalsy();
  //     expect(updatedLocalStore.store.managed_validators[`$${testAddress}:80`]).toBeTruthy();
  //   });
  // });
  //
  // describe('deleteSocketsPropertyFromStore', () => {
  //   let testLocalStore;
  //
  //   beforeEach(() => {
  //     testLocalStore = new ElectronStore({name: 'test'});
  //     testLocalStore.clear();
  //     testLocalStore.set({sockets: {}});
  //   });
  //
  //   afterEach(() => {
  //     testLocalStore.clear();
  //   });
  //
  //   test('deletes sockets from store', () => {
  //     expect(testLocalStore.store.sockets).toBeTruthy();
  //     const updatedLocalStore = deleteSocketsPropertyFromStore(testLocalStore);
  //     expect(updatedLocalStore.store.sockets).toBeFalsy();
  //   });
  // });
});
