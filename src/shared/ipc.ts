export enum IpcChannel {
  downloadSigningKey = 'download-signing-key',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  restartApp = 'restart-app',
}

export const getSuccessChannel = (channel: IpcChannel) => `${channel}-success`;

export const getFailChannel = (channel: IpcChannel) => `${channel}-fail`;
