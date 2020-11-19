import ElectronStore from 'electron-store';
import packageJson from '../../../package.json';

const migrations: any = {};
const projectVersion = packageJson.version;

migrations[projectVersion] = (store: any) => {
  store.set('sockets', {});
};
const options: any = {
  migrations,
  projectVersion,
};
const localStore = new ElectronStore(options);

export default localStore;
