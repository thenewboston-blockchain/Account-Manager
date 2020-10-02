import React, {FC, memo, ReactNode} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import {Button} from '@renderer/components/FormElements';
import Icon, {IconType} from '@renderer/components/Icon';

import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileBankSigningDetails.scss';

interface Item {
  key: string;
  title: string;
  value: string;
}

interface ComponentProps {
  className?: string;
  items: Item[];
}

const TileBankSigningDetails: FC<ComponentProps> = ({className, items}) => {
  const handleCopy = (value: string): void => {
    displayToast(`${items.find((e) => e.value === value)?.title} copied to the clipboard`, 'success');
  };

  const renderList = (): ReactNode => {
    return items.map(({key, title, value}) => (
      <div key={key}>
        <div className={clsx('TileBankSigningDetails__top', {...getCustomClassNames(className, '__top', true)})}>
          <div className={clsx('TileBankSigningDetails__title', {...getCustomClassNames(className, '__title', true)})}>
            {title}
          </div>
          <CopyToClipboard onCopy={handleCopy} text={value}>
            <div
              className={clsx('TileBankSigningDetails__copy-container', {
                ...getCustomClassNames(className, '__copy-container', true),
              })}
            >
              <Icon className={clsx('TileBankSigningDetails__copy-icon')} icon={IconType.contentCopy} size={22} />
              <div className={clsx('TileBankSigningDetails__copy-text')}>Copy</div>
            </div>
          </CopyToClipboard>
        </div>
        <div className={clsx('TileBankSigningDetails__value')}>{value}</div>
      </div>
    ));
  };

  return (
    <Tile className={clsx('TileBankSigningDetails', className)}>
      <>
        {renderList()}
        <Button color="white">Add NID Signing Key</Button>
      </>
    </Tile>
  );
};

export default memo(TileBankSigningDetails);
