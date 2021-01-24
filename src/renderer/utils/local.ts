import ElectronStore from 'electron-store';
import {v4 as uuidv4} from 'uuid';
import {LocalStore, MigrationFunction} from '@renderer/types';

export const generateUuid = () => uuidv4();

export const runMigrationFunction = (
  localStore: ElectronStore<LocalStore>,
  currentVersion: number,
  migrationFn: MigrationFunction,
): void => {
  if (localStore.get('version') > currentVersion) return;

  migrationFn(localStore);
  localStore.set('version', currentVersion);
};
