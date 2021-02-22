import React, {FC, ReactNode, RefObject, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import clsx from 'clsx';
import {Button, ButtonColor, Icon, IconType} from '@thenewboston/ui';

import AddValidatorSigningKeysModal from '@renderer/containers/Validator/AddValidatorSigningKeysModal';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getIsManagedValidator, getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, RootState} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';
import {displayToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileValidatorSigningDetails.scss';

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

const TileValidatorSigningDetails: FC<ComponentProps> = ({className, items}) => {
  const [addSigningKeyModalIsOpen, toggleSigningKeyModal] = useBooleanState(false);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const isManagedValidator = useSelector((state: RootState) => getIsManagedValidator(state, address));
  const managedValidators = useSelector(getManagedValidators);
  const managedValidator = managedValidators[address];

  const buttonText = useMemo(() => {
    const prefix = !!managedValidator?.account_signing_key && !!managedValidator?.nid_signing_key ? 'Edit' : 'Add';
    return `${prefix} Signing Keys (for DevOps)`;
  }, [managedValidator]);

  const handleAddManagedValidator = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedValidator({
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
          <div className="TileValidatorSigningDetails__top">
            <div className="TileValidatorSigningDetails__title">{title}</div>
            <CopyToClipboard onCopy={handleCopy(item)} text={value}>
              <Icon className="TileValidatorSigningDetails__copy-icon" icon={IconType.contentCopy} ref={ref} />
            </CopyToClipboard>
          </div>
          <div className="TileValidatorSigningDetails__value">{value}</div>
        </div>
      );
    });
  };

  return (
    <Tile className={clsx('TileValidatorSigningDetails', className)}>
      {renderItems()}
      {isManagedValidator ? (
        <Button color={ButtonColor.secondary} onClick={toggleSigningKeyModal}>
          {buttonText}
        </Button>
      ) : (
        <Button color={ButtonColor.secondary} onClick={handleAddManagedValidator}>
          Add to Managed Validators
        </Button>
      )}
      {addSigningKeyModalIsOpen && <AddValidatorSigningKeysModal close={toggleSigningKeyModal} />}
    </Tile>
  );
};

export default TileValidatorSigningDetails;
