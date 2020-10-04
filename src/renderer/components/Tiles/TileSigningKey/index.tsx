import React, {FC, useEffect} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';

import {useBooleanState} from '@renderer/hooks';
import {getCustomClassNames} from '@renderer/utils/components';
import Icon, {IconType} from '@renderer/components/Icon';
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
  const [signingKeyVisible, toggleSigningKeyVisible, , setSigningKeyInvisible] = useBooleanState(false);

  useEffect(() => {
    setSigningKeyInvisible();
  }, [accountNumber, setSigningKeyInvisible]);

  const handleCopy = (): void => {
    displayToast('Signing Key copied to the clipboard', 'success');
  };

  const renderSigningKeyDisplay = () => {
    if (loading) return '-';
    return <div>{signingKeyVisible ? signingKey : '*'.repeat(64)}</div>;
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
            <div
              className={clsx('TileSigningKey__toggle', {...getCustomClassNames(className, '__toggle', true)})}
              onClick={toggleSigningKeyVisible}
            >
              {signingKeyVisible ? (
                <Icon className={clsx('TileSigningKey__eye-off-icon')} icon={IconType.eyeOff} size={22} />
              ) : (
                <Icon className={clsx('TileSigningKey__eye-icon')} icon={IconType.eye} size={22} />
              )}
            </div>
            <CopyToClipboard onCopy={handleCopy} text={signingKey}>
              <div
                className={clsx('TileSigningKey__copy-container', {
                  ...getCustomClassNames(className, '__copy-container', true),
                })}
              >
                <Icon className={clsx('TileSigningKey__copy-icon')} icon={IconType.contentCopy} size={22} />
              </div>
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
