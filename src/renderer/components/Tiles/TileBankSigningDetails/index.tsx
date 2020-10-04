import React, {FC, memo, useMemo, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';

import AddBankSigningKeysModal from '@renderer/containers/Bank/AddBankSigningKeysModal';

import {getIsManagedBank, getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {AppDispatch, RootState} from '@renderer/types';

import {Button} from '@renderer/components/FormElements';
import Icon, {IconType} from '@renderer/components/Icon';

import {getCustomClassNames} from '@renderer/utils/components';
import {parseAddressData} from '@renderer/utils/address';
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
  const [addSigningKeyModalIsOpen, toggleSigningKeyModal] = useBooleanState(false);

  const dispatch = useDispatch<AppDispatch>();
  const address = useAddress();
  const isManagedBank = useSelector((state: RootState) => getIsManagedBank(state, address));

  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];

  const handleAddManagedBank = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedBank({
        acc_signing_key: '',
        ip_address: ipAddress,
        nickname: '',
        nid_signing_key: '',
        port,
        protocol,
      }),
    );
  };

  const signingKeysButtonText = useMemo(() => {
    const prefix = !!managedBank?.acc_signing_key && !!managedBank?.nid_signing_key ? 'Edit' : 'Add';
    return `${prefix} Signing Keys (For DEVOPS)`;
  }, [managedBank]);

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

        {isManagedBank ? (
          <Button color="white" onClick={toggleSigningKeyModal}>
            {signingKeysButtonText}
          </Button>
        ) : (
          <Button color="white" onClick={handleAddManagedBank}>
            Add to Managed Banks
          </Button>
        )}

        {addSigningKeyModalIsOpen && <AddBankSigningKeysModal close={toggleSigningKeyModal} />}
      </>
    </Tile>
  );
};

export default memo(TileBankSigningDetails);
