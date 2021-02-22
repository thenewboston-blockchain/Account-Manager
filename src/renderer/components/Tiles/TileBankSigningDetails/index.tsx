import React, {FC, ReactNode, RefObject, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';
import {Button, ButtonColor, Icon, IconType} from '@thenewboston/ui';

import AddBankSigningKeysModal from '@renderer/containers/Bank/AddBankSigningKeysModal';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getIsManagedBank, getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, RootState} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';
import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileBankSigningDetails.scss';

interface Item {
  key: string;
  ref: RefObject<HTMLDivElement>;
  title: string;
  value: string;
}

interface ComponentProps {
  className?: string;
  items: Item[];
}

const TileBankSigningDetails: FC<ComponentProps> = ({className, items}) => {
  const [addSigningKeyModalIsOpen, toggleSigningKeyModal] = useBooleanState(false);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const isManagedBank = useSelector((state: RootState) => getIsManagedBank(state, address));
  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];

  const buttonText = useMemo(() => {
    const prefix = !!managedBank?.account_signing_key && !!managedBank?.nid_signing_key ? 'Edit' : 'Add';
    return `${prefix} Signing Keys (for DevOps)`;
  }, [managedBank]);

  const handleAddManagedBank = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedBank({
        account_signing_key: '',
        ip_address: ipAddress,
        nickname: '',
        nid_signing_key: '',
        port,
        protocol,
      }),
    );
  };

  const handleCopy = (item: Item) => (): void => {
    displayToast(`${item.title} copied to the clipboard`, 'success');
    item.ref.current?.blur();
  };

  const renderItems = (): ReactNode => {
    return items.map((item) => {
      const {key, ref, title, value} = item;
      return (
        <div key={key}>
          <div className="TileBankSigningDetails__top">
            <div className="TileBankSigningDetails__title">{title}</div>
            <CopyToClipboard onCopy={handleCopy(item)} text={value}>
              <Icon className="TileBankSigningDetails__copy-icon" icon={IconType.contentCopy} ref={ref} />
            </CopyToClipboard>
          </div>
          <div className="TileBankSigningDetails__value">{value}</div>
        </div>
      );
    });
  };

  return (
    <Tile className={clsx('TileBankSigningDetails', className)}>
      {renderItems()}
      {isManagedBank ? (
        <Button color={ButtonColor.secondary} onClick={toggleSigningKeyModal}>
          {buttonText}
        </Button>
      ) : (
        <Button color={ButtonColor.secondary} onClick={handleAddManagedBank}>
          Add to Managed Banks
        </Button>
      )}
      {addSigningKeyModalIsOpen && <AddBankSigningKeysModal close={toggleSigningKeyModal} />}
    </Tile>
  );
};

export default TileBankSigningDetails;
