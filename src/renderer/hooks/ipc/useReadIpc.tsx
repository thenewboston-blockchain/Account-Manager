import {useCallback, useMemo} from 'react';
import {ipcRenderer, OpenDialogOptions, remote} from 'electron';
import {GenericVoidFunction} from '@renderer/types';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';
import {useIpcEffect} from './utils';

interface DownloadOptions {
  buttonLabel: string;
  title: string;
}

function useReadIpc({
  channel,
  downloadOptions,
  failCallback,
  postSendCallback,
  successCallback,
}: {
  channel: IpcChannel;
  downloadOptions: DownloadOptions;
  failCallback: GenericVoidFunction;
  postSendCallback?: GenericVoidFunction;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  const options: OpenDialogOptions = useMemo(
    () => ({
      buttonLabel: downloadOptions.buttonLabel,
      filters: [
        {extensions: ['json'], name: 'json'},
        {extensions: ['*'], name: 'All Files'},
      ],
      title: downloadOptions.title,
    }),
    [downloadOptions.buttonLabel, downloadOptions.title],
  );

  return useCallback(async (): Promise<void> => {
    remote.dialog.showOpenDialog(options).then(({filePaths}) => {
      if (!filePaths.length) return;

      ipcRenderer.send(channel, {filePath: filePaths[0]});
      postSendCallback?.();
    });
  }, [channel, options, postSendCallback]);
}

export default useReadIpc;
