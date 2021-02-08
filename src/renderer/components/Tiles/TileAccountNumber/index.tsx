import React, {FC, memo, useMemo, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import Qr from '@renderer/components/Qr';
import {AccountType} from '@renderer/types';
import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileAccountNumber.scss';

interface ComponentProps {
  accountNumber: string;
  className?: string;
  type: AccountType | null;
}

const TileAccountNumber: FC<ComponentProps> = ({accountNumber, className, type}) => {
  const copyIconRef = useRef<HTMLDivElement>(null);

  const title = useMemo(() => {
    switch (type) {
      case AccountType.managedAccount:
        return 'My Account Number';
      case AccountType.managedFriend:
        return "Friend's Account Number";
      default:
        return 'Account Number';
    }
  }, [type]);

  const handleCopy = (): void => {
    displayToast('Account Number copied to the clipboard', 'success');
    copyIconRef.current?.blur();
  };

  return (
    <Tile className={clsx('TileAccountNumber', className)}>
      <>
        <div className={clsx('TileAccountNumber__top', {...bemify(className, '__top')})}>
          <div className={clsx('TileAccountNumber__title', {...bemify(className, '__title')})}>{title}</div>
          <CopyToClipboard onCopy={handleCopy} text={accountNumber}>
            <Icon
              className={clsx('TileAccountNumber__copy-icon', {...bemify(className, '__copy-icon')})}
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
