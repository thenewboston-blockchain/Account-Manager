// used to mock ElectronStore
class TestElectronStore {
  store: any;

  readonly path: string = '';

  readonly size: number = 0;

  readonly reset: any;

  readonly has: any;

  readonly openInEditor: any;

  readonly onDidChange: any;

  readonly onDidAnyChange: any;

  readonly [Symbol.iterator]: any;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  delete(key: string) {
    delete this.store[key];
  }

  set(arg1: string | Record<string, any>, value?: any) {
    if (typeof arg1 === 'string') {
      this.store[arg1] = value;
    } else {
      this.store = arg1;
    }
  }

  get(key: string) {
    return this.store[key];
  }
}

export default TestElectronStore;
