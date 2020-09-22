import React, {FC, useEffect} from 'react';
import clsx from 'clsx';

import {useBooleanState} from '@renderer/hooks';
import {getCustomClassNames} from '@renderer/utils/components';

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
            className={clsx('TileSigningKey__toggle', {...getCustomClassNames(className, '__title', true)})}
            onClick={toggleSigningKeyVisible}
          >
            {signingKeyVisible ? 'Hide' : 'Show'}
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
