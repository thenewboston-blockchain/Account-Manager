import {Dict, MigrationFunction} from '@renderer/types';

type ProtocolType = 'http' | 'https';

export interface OldManagedNode {
  account_signing_key: string;
  ip_address: string;
  is_default?: boolean;
  nickname: string;
  nid_signing_key: string;
  port: number | null;
  protocol: ProtocolType;
}

export interface NewManagedNode {
  account_signing_key: string;
  ip_address: string;
  is_default?: boolean;
  nickname: string;
  nid_signing_key: string;
  port: number;
  protocol: ProtocolType;
}

export const addPortToManagedNodes = (managedNodes: Dict<OldManagedNode>): Dict<NewManagedNode> => {
  const updatedNodes: Dict<NewManagedNode> = {};
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
