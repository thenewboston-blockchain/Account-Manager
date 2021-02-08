import React, {FC, useCallback, useEffect, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import {useBooleanState, useWriteIpc} from '@renderer/hooks';
import {displayToast} from '@renderer/utils/toast';
import {IpcChannel} from '@shared/ipc';

import Tile from '../Tile';
import './TileSigningKey.scss';

interface ComponentProps {
  accountNumber: string;
  className?: string;
  signingKey: string;
}

const downloadSuccessToast = () => {
  displayToast('Signing Key has been saved locally', 'success');
};

const downloadFailToast = (e: any, error: string) => {
  displayToast(`Could not save signing key: ${error}`);
};

const TileSigningKey: FC<ComponentProps> = ({accountNumber, className, signingKey}) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const [showSigningKey, toggleSigningKey, , hideSigningKey] = useBooleanState(false);

  const handleDownloadBlur = useCallback(() => {
    downloadRef.current?.blur();
  }, [downloadRef]);

  const handleDownloadClick = useWriteIpc({
    channel: IpcChannel.downloadSigningKey,
    downloadOptions: {buttonLabel: 'Save', defaultPath: `${accountNumber}.txt`, title: 'Save Signing Key'},
    extension: 'txt',
    failCallback: downloadFailToast,
    payload: signingKey,
    postSendCallback: handleDownloadBlur,
    successCallback: downloadSuccessToast,
  });

  useEffect(() => {
    hideSigningKey();
  }, [accountNumber, hideSigningKey]);

  const handleCopy = (): void => {
    displayToast('Signing Key copied to the clipboard', 'success');
    copyRef.current?.blur();
  };

  const handleEyeClick = (): void => {
    toggleSigningKey();
    eyeRef.current?.blur();
  };

  const renderSigningKeyDisplay = () => {
    return <div>{showSigningKey ? signingKey : '*'.repeat(64)}</div>;
  };

  return (
    <Tile className={clsx('TileSigningKey', className)}>
      <>
        <div className={clsx('TileAccountNumber__top', {...bemify(className, '__top')})}>
          <div className={clsx('TileSigningKey__title', {...bemify(className, '__title')})}>My Signing Key</div>
          <div
            className={clsx('TileSigningKey__icons-container', {
              ...bemify(className, '__icons-container'),
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
        <div className={clsx('TileSigningKey__signing-key', {...bemify(className, '__signing-key')})}>
          {renderSigningKeyDisplay()}
        </div>
      </>
    </Tile>
  );
};

export default TileSigningKey;
