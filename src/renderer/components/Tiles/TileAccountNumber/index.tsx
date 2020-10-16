import React, {FC, memo, useMemo, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import Qr from '@renderer/components/Qr';
import {getCustomClassNames} from '@renderer/utils/components';
import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileAccountNumber.scss';

interface ComponentProps {
  accountNumber: string;
  className?: string;
  type: 'account' | 'friend';
}

const TileAccountNumber: FC<ComponentProps> = ({accountNumber, className, type}) => {
  const copyIconRef = useRef<HTMLDivElement>(null);

  const title = useMemo(() => {
    const prefix = type === 'account' ? 'My' : "Friend's";
    return `${prefix} Account Number`;
  }, [type]);

  const handleCopy = (): void => {
    displayToast('Account Number copied to the clipboard', 'success');
    copyIconRef.current?.blur();
  };

  return (
    <Tile className={clsx('TileAccountNumber', className)}>
      <>
        <div className={clsx('TileAccountNumber__top', {...getCustomClassNames(className, '__top', true)})}>
          <div className={clsx('TileAccountNumber__title', {...getCustomClassNames(className, '__title', true)})}>
            {title}
          </div>
          <CopyToClipboard onCopy={handleCopy} text={accountNumber}>
            <Icon
              className={clsx('TileAccountNumber__copy-icon', {...getCustomClassNames(className, '__copy-icon', true)})}
              icon={IconType.contentCopy}
              ref={copyIconRef}
            />
          </CopyToClipboard>
        </div>
        <div className={clsx('TileAccountNumber__account-number')}>{accountNumber}</div>
        <Qr className="TileAccountNumber__qr" text={accountNumber} width={120} />
      </>
    </Tile>
  );
};

export default memo(TileAccountNumber);
