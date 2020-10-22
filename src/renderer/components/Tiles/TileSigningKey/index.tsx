import React, {FC, useCallback, useEffect, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';
import {ipcRenderer, remote, SaveDialogOptions} from 'electron';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';
import {getCustomClassNames} from '@renderer/utils/components';
import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileSigningKey.scss';

interface ComponentProps {
  accountNumber: string;
  className?: string;
  loading: boolean;
  signingKey: string;
}

const TileSigningKey: FC<ComponentProps> = ({accountNumber, className, loading, signingKey}) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const [showSigningKey, toggleSigningKey, , hideSigningKey] = useBooleanState(false);

  useEffect(() => {
    hideSigningKey();
  }, [accountNumber, hideSigningKey]);

  const displayDownloadSuccessToast = useCallback(() => {
    displayToast('Signing Key has been saved locally', 'success');
  }, []);

  const displayDownloadFailToast = useCallback(() => {
    displayToast('Error: could not save signing key');
  }, []);

  useEffect(() => {
    ipcRenderer.on('download-signing-key-success', displayDownloadSuccessToast);

    return () => {
      ipcRenderer.removeListener('download-signing-key-success', displayDownloadSuccessToast);
    };
  }, [displayDownloadSuccessToast]);

  useEffect(() => {
    ipcRenderer.on('download-signing-key-fail', displayDownloadFailToast);

    return () => {
      ipcRenderer.removeListener('download-signing-key-fail', displayDownloadFailToast);
    };
  }, [displayDownloadFailToast]);

  const handleCopy = (): void => {
    displayToast('Signing Key copied to the clipboard', 'success');
    copyRef.current?.blur();
  };

  const handleDownloadClick = async (): Promise<void> => {
    const options = {
      buttonLabel: 'Save',
      defaultPath: `${accountNumber}.txt`,
      filters: [
        {extensions: ['txt'], name: 'txt'},
        {extensions: ['*'], name: 'All Files'},
      ],
      title: 'Save Signing Key',
    } as SaveDialogOptions;

    remote.dialog.showSaveDialog(options).then(({canceled, filePath}) => {
      if (canceled) return;
      ipcRenderer.send('download-signing-key', {filePath, signingKey});
    });
    downloadRef.current?.blur();
  };

  const handleEyeClick = (): void => {
    toggleSigningKey();
    eyeRef.current?.blur();
  };

  const renderSigningKeyDisplay = () => {
    if (loading) return '-';
    return <div>{showSigningKey ? signingKey : '*'.repeat(64)}</div>;
  };

  return (
    <Tile className={clsx('TileSigningKey', className)}>
      <>
        <div className={clsx('TileAccountNumber__top', {...getCustomClassNames(className, '__top', true)})}>
          <div className={clsx('TileSigningKey__title', {...getCustomClassNames(className, '__title', true)})}>
            My Signing Key
          </div>
          <div
            className={clsx('TileSigningKey__icons-container', {
              ...getCustomClassNames(className, '__icons-container', true),
            })}
          >
            <Icon
              className="TileSigningKey__download-icon"
              icon={IconType.download}
              onClick={handleDownloadClick}
              ref={downloadRef}
            />
            <Icon
              className="TileSigningKey__eye-icon"
              icon={showSigningKey ? IconType.eyeOff : IconType.eye}
              onClick={handleEyeClick}
              ref={eyeRef}
            />
            <CopyToClipboard onCopy={handleCopy} text={signingKey}>
              <Icon className="TileSigningKey__copy-icon" icon={IconType.contentCopy} ref={copyRef} />
            </CopyToClipboard>
          </div>
        </div>
        <div
          className={clsx('TileSigningKey__signing-key', {...getCustomClassNames(className, '__signing-key', true)})}
        >
          {renderSigningKeyDisplay()}
        </div>
      </>
    </Tile>
  );
};

export default TileSigningKey;
