import ElectronStore from 'electron-store';
import {LocalStore} from '@renderer/types';

import migration0 from './migrationFiles/00000';
import {MigrationFunction} from './types';
import {runMigrationFunction} from './utils';

const migrationFunctions: MigrationFunction[] = [migration0];

const STORE_VERSION = migrationFunctions.length - 1;

export const runMigrations = (localStore: ElectronStore<LocalStore>): void => {
  // Brand new install
  if (!localStore.store || !Object.keys(localStore.store).length) {
    localStore.set('version', STORE_VERSION);
    return;
  }

  // Default to -1 if user did not have the `version` property.
  // that way it will set 'i=0' in the for loop below.
  const currentUserVersion = localStore.get('version') || -1;

  for (let i = currentUserVersion + 1; i < migrationFunctions.length; i += 1) {
    const migrationFunction = migrationFunctions[i];
    runMigrationFunction(localStore, i, migrationFunction);
  }
};
