import ElectronStore from 'electron-store';
import {remote} from 'electron';

const migrations: any = {};
const projectVersion = process.env.npm_package_version || remote.app.getVersion();

migrations[projectVersion] = (store: any) => {
  store.set('sockets', {});
};
const options: any = {
  migrations,
  projectVersion,
};
const localStore = new ElectronStore(options);

export default localStore;
