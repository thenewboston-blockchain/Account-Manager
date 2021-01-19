import ElectronStore from 'electron-store';
import {Dict, LocalStore, ManagedNode} from '@renderer/types';

const migrations: Array<(localStore: ElectronStore<LocalStore>, index: number) => void> = [
  (localStore, index) => {
    if (localStore.get('version') > index) return;

    // Remove `sockets` data, as it was never used
    localStore.delete('sockets' as any);

    // "port" is now required
    const addPortToManagedNodes = (managedNodes: Dict<ManagedNode>): Dict<ManagedNode> => {
      const updatedNodes: Dict<ManagedNode> = {};
      for (const [address, managedNode] of Object.entries(managedNodes)) {
        const hasPortInAddress = address.split('').filter((char) => char === ':').length === 2;
        const updatedAddress = hasPortInAddress ? address : `${address}:80`;

        updatedNodes[updatedAddress] = {
          ...managedNode,
          port: managedNode.port === null ? 80 : managedNode.port,
        };
      }
      return updatedNodes;
    };

    const managedBanks = localStore.get('managed_banks');
    const updatedManagedBanks = addPortToManagedNodes(managedBanks);
    localStore.set('managed_banks', updatedManagedBanks);

    const managedValidators = localStore.get('managed_validators');
    const updatedManagedValidators = addPortToManagedNodes(managedValidators);
    localStore.set('managed_validators', updatedManagedValidators);

    localStore.set('version', index);
  },
];

export const runMigrations = (localStore: ElectronStore<LocalStore>): void => {
  const version = localStore.get('version');

  for (let i = version === undefined ? 0 : version + 1; i < migrations.length; i += 1) {
    migrations[i](localStore, i);
  }
};
