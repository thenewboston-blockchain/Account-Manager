import ElectronStore from 'electron-store';
import {LocalStore} from '@renderer/types';

export const runMigrationFunction = (
  localStore: ElectronStore<LocalStore>,
  currentVersion: number,
  migrationFn: (store: ElectronStore<LocalStore>) => void,
): void => {
  if (localStore.get('version') > currentVersion) return;

  migrationFn(localStore);
  localStore.set('version', currentVersion);
};
