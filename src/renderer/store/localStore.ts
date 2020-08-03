import ElectronStore from 'electron-store';

const localStore = new ElectronStore({
  schema: {
    accounts: {
      default: {},
      type: 'object',
    },
  },
});

export default localStore;
