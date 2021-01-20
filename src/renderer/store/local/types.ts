import ElectronStore from 'electron-store';
import {LocalStore} from '@renderer/types';

export type AppElectronStore = ElectronStore<LocalStore>;

export type MigrationFunction = (localStore: AppElectronStore) => void;
