import React, {FC, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import sortBy from 'lodash/sortBy';

import Badge from '@renderer/components/Badge';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getIsActiveBank, getIsManagedBank, getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, RootState} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';

import AddBankSigningKeyModal from './AddBankSigningKeyModal';
import BankAccounts from './BankAccounts';
import BankBanks from './BankBanks';
import BankBlocks from './BankBlocks';
import BankConfirmationBlocks from './BankConfirmationBlocks';
import BankInvalidBlocks from './BankInvalidBlocks';
import BankOverview from './BankOverview';
import BankTransactions from './BankTransactions';
import BankValidatorConfirmationServices from './BankValidatorConfirmationServices';
import BankValidators from './BankValidators';
import EditBankNicknameModal from './EditBankNicknameModal';
import RemoveBankModal from './RemoveBankModal';
import SetAsActiveBankModal from './SetAsActiveBankModal';
import './Bank.scss';

const Bank: FC = () => {
  const {path, url} = useRouteMatch();
  const [addSigningKeyModalIsOpen, toggleSigningKeyModal] = useBooleanState(false);
  const [editNicknameModalIsOpen, toggleEditNicknameModal] = useBooleanState(false);
  const [removeBankModalIsOpen, toggleRemoveBankModal] = useBooleanState(false);
  const [setAsActiveBankModalIsOpen, toggleSetAsActiveBankModal] = useBooleanState(false);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const isActiveBank = useSelector((state: RootState) => getIsActiveBank(state, address));
  const isManagedBank = useSelector((state: RootState) => getIsManagedBank(state, address));
  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];

  const getDropdownMenuOptions = (): DropdownMenuOption[] => {
    if (!isManagedBank) return [];

    const menuOptions = [
      {
        label: 'Edit Nickname',
        onClick: toggleEditNicknameModal,
      },
      {
        disabled: isActiveBank,
        label: 'Remove Bank',
        onClick: toggleRemoveBankModal,
      },
      {
        disabled: isActiveBank,
        label: 'Set as Active Bank',
        onClick: toggleSetAsActiveBankModal,
      },
    ];

    const signingKeyOption = !managedBank.nid_signing_key
      ? {
          label: 'Add NID Signing Key',
          onClick: toggleSigningKeyModal,
        }
      : {
          label: 'Remove NID Signing Key',
          onClick: handleRemoveSigningKey,
        };

    return sortBy([...menuOptions, signingKeyOption], ['label']);
  };

  const handleAddManagedBank = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedBank({
        ip_address: ipAddress,
        nickname: '',
        nid_signing_key: '',
        port,
        protocol,
      }),
    );
  };

  const handleRemoveSigningKey = (): void => {
    dispatch(
      setManagedBank({
        ...managedBank,
        nid_signing_key: '',
      }),
    );
  };

  const renderAuthenticatedBadge = (): ReactNode => {
    if (!managedBank?.nid_signing_key) return null;
    return <Badge color="secondary" text="Authenticated" />;
  };

  const renderRightPageHeaderButtons = (): ReactNode => {
    if (isActiveBank || isManagedBank) return null;
    return <Button onClick={handleAddManagedBank}>Add to Managed Banks</Button>;
  };

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <BankAccounts managedBank={managedBank} />,
        page: 'accounts',
      },
      {
        content: <BankBanks managedBank={managedBank} />,
        page: 'banks',
      },
      {
        content: <BankBlocks />,
        page: 'blocks',
      },
      {
        content: <BankConfirmationBlocks />,
        page: 'confirmation-blocks',
      },
      {
        content: <BankInvalidBlocks />,
        page: 'invalid-blocks',
      },
      {
        content: <BankOverview />,
        page: 'overview',
      },
      {
        content: <BankTransactions />,
        page: 'transactions',
      },
      {
        content: <BankValidatorConfirmationServices />,
        page: 'validator-confirmation-services',
      },
      {
        content: <BankValidators managedBank={managedBank} />,
        page: 'validators',
      },
    ];

    return (
      <Switch>
        {tabContentRoutes.map(({content, page}) => (
          <Route key={page} path={`${path}/${page}`}>
            {content}
          </Route>
        ))}
      </Switch>
    );
  };

  const renderTitle = (): string => {
    if (isManagedBank) {
      return managedBank.nickname || managedBank.ip_address;
    }
    const {ipAddress} = parseAddressData(address);
    return ipAddress;
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={getDropdownMenuOptions()}
        leftContent={renderAuthenticatedBadge()}
        rightContent={renderRightPageHeaderButtons()}
        title={renderTitle()}
      />
      <PageTabs
        baseUrl={url}
        breakpoint="large"
        items={[
          {
            name: 'Overview',
            page: 'overview',
          },
          {
            name: 'Accounts',
            page: 'accounts',
          },
          {
            name: 'Transactions',
            page: 'transactions',
          },
          {
            name: 'Blocks',
            page: 'blocks',
          },
          {
            name: 'Confirmations',
            page: 'confirmation-blocks',
          },
          {
            name: 'Invalid Blocks',
            page: 'invalid-blocks',
          },
          {
            name: 'Banks',
            page: 'banks',
          },
          {
            name: 'Validators',
            page: 'validators',
          },
          {
            name: 'Confirmation Services',
            page: 'validator-confirmation-services',
          },
        ]}
      />
    </>
  );

  return (
    <div className="Bank">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {addSigningKeyModalIsOpen && <AddBankSigningKeyModal close={toggleSigningKeyModal} />}
      {editNicknameModalIsOpen && <EditBankNicknameModal close={toggleEditNicknameModal} bank={managedBank} />}
      {removeBankModalIsOpen && <RemoveBankModal close={toggleRemoveBankModal} bank={managedBank} />}
      {setAsActiveBankModalIsOpen && <SetAsActiveBankModal close={toggleSetAsActiveBankModal} bank={managedBank} />}
    </div>
  );
};

export default Bank;
