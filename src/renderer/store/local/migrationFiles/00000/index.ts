import {Dict, ManagedNode} from '@renderer/types';
import {MigrationFunction} from '../../types';

export const addPortToManagedNodes = (managedNodes: Dict<ManagedNode>): Dict<ManagedNode> => {
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

export const addPortPropertyToStore: MigrationFunction = (localStore) => {
  const managedBanks = localStore.get('managed_banks');
  const updatedManagedBanks = addPortToManagedNodes(managedBanks);
  localStore.set('managed_banks', updatedManagedBanks);

  const managedValidators = localStore.get('managed_validators');
  const updatedManagedValidators = addPortToManagedNodes(managedValidators);
  localStore.set('managed_validators', updatedManagedValidators);
};

export const deleteSocketsPropertyFromStore: MigrationFunction = (localStore) => {
  localStore.delete('sockets' as any);
};

const migrationFunction: MigrationFunction = (localStore) => {
  // Remove `sockets` data, as it was never used
  deleteSocketsPropertyFromStore(localStore);

  // "port" property is now required.
  addPortPropertyToStore(localStore);
};

export default migrationFunction;

// TODO: add a button to import/export/reset localStore
// TODO: Make tests file to be able to be TS
// TODO: reenable tests
// TODO: Write a migrations.md file detailing how to 1) checkout migration branches, 2) work on issues involving migrations
