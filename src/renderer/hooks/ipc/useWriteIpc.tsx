import {useCallback, useMemo} from 'react';
import {ipcRenderer, remote, SaveDialogOptions} from 'electron';
import {GenericVoidFunction} from '@renderer/types';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';
import {useIpcEffect} from './utils';

interface DownloadOptions {
  buttonLabel: string;
  defaultPath: string;
  title: string;
}

function useWriteIpc({
  channel,
  downloadOptions,
  failCallback,
  payload,
  postSendCallback,
  successCallback,
}: {
  channel: IpcChannel;
  downloadOptions: DownloadOptions;
  failCallback: GenericVoidFunction;
  payload: string;
  postSendCallback?: GenericVoidFunction;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  const options: SaveDialogOptions = useMemo(
    () => ({
      buttonLabel: downloadOptions.buttonLabel,
      defaultPath: downloadOptions.defaultPath,
      filters: [
        {extensions: ['txt'], name: 'txt'},
        {extensions: ['*'], name: 'All Files'},
      ],
      title: downloadOptions.title,
    }),
    [downloadOptions.buttonLabel, downloadOptions.defaultPath, downloadOptions.title],
  );

  return useCallback(async (): Promise<void> => {
    remote.dialog.showSaveDialog(options).then(({canceled, filePath}) => {
      if (canceled) return;
      ipcRenderer.send(channel, {filePath, payload});
      postSendCallback?.();
    });
  }, [channel, options, payload, postSendCallback]);
}

export default useWriteIpc;
