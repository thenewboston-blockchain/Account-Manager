import ElectronStore from 'electron-store';

const localStore = new ElectronStore({
  migrations: {
    '1.0.0-alpha.26': (store) => {
      store.set('sockets', {});
    },
  },
});

export default localStore;
