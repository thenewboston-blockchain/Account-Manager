import ElectronStore from 'electron-store';
import {LocalStore, MigrationFunction} from '@renderer/types';
import {runMigrationFunction} from '@renderer/utils/local';

import migration0 from './migrationFiles/00000';
import migration1 from './migrationFiles/00001';
import migration2 from './migrationFiles/00002';

// Before you add migrations, be sure to follow the directions!
// https://github.com/thenewboston-developers/Account-Manager/blob/master/migrations.md#submitting-a-pr-with-migrations
const migrationFunctions: MigrationFunction[] = [migration0, migration1, migration2];

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
