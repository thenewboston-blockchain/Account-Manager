import ElectronStore from 'electron-store';
import {LocalStore} from '@renderer/types';
import {runMigrations} from './migrations';

const localStore = new ElectronStore<LocalStore>();
runMigrations(localStore);

export default localStore;
