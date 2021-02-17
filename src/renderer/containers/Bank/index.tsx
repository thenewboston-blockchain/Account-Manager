import React, {FC, ReactNode, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import {Button, Icon, IconType} from '@thenewboston/ui';

import Badge from '@renderer/components/Badge';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getIsActiveBank, getIsManagedBank, getManagedAccounts, getManagedBanks} from '@renderer/selectors';
import {setManagedBank} from '@renderer/store/app';
import {AppDispatch, RootState} from '@renderer/types';
import {parseAddressData} from '@renderer/utils/address';

import AddBankSigningKeysModal from './AddBankSigningKeysModal';
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
  const history = useHistory();
  const isActiveBank = useSelector((state: RootState) => getIsActiveBank(state, address));
  const isManagedBank = useSelector((state: RootState) => getIsManagedBank(state, address));
  const managedAccounts = useSelector(getManagedAccounts);
  const managedBanks = useSelector(getManagedBanks);
  const managedBank = managedBanks[address];

  const isAuthenticated = useMemo((): boolean => {
    return !!managedBank?.account_signing_key && !!managedBank?.nid_signing_key;
  }, [managedBank]);

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
      {
        label: `${isAuthenticated ? 'Edit' : 'Add'} Signing Keys (for DevOps)`,
        onClick: toggleSigningKeyModal,
      },
    ];

    return sortBy(menuOptions, ['label']);
  };

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

  const renderAccountLink = (): ReactNode => {
    if (!managedBank) return null;
    const linkedAccount = Object.values(managedAccounts).find(
      ({signing_key}) => signing_key === managedBank.account_signing_key,
    );
    if (!linkedAccount) return null;
    return (
      <Icon
        className="Bank__chain-link-icon"
        icon={IconType.link}
        onClick={() => {
          history.push(`/account/${linkedAccount.account_number}/overview`);
        }}
      />
    );
  };

  const renderActiveBadge = (): ReactNode => {
    if (!managedBank?.is_default) return null;
    return <Badge className="Bank__Badge" color="secondary" text="Active" />;
  };

  const renderAuthenticatedBadge = (): ReactNode => {
    if (!isAuthenticated) return null;
    return <Badge className="Bank__Badge" color="tertiary-light" text="Authenticated" />;
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
        content: <BankOverview isAuthenticated={isAuthenticated} managedBank={managedBank} />,
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
    if (isManagedBank) return managedBank.nickname || managedBank.ip_address;
    const {ipAddress} = parseAddressData(address);
    return ipAddress;
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={getDropdownMenuOptions()}
        leftContent={
          <>
            {renderActiveBadge()}
            {renderAuthenticatedBadge()}
            {renderAccountLink()}
          </>
        }
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
      {addSigningKeyModalIsOpen && <AddBankSigningKeysModal close={toggleSigningKeyModal} />}
      {editNicknameModalIsOpen && <EditBankNicknameModal close={toggleEditNicknameModal} bank={managedBank} />}
      {removeBankModalIsOpen && <RemoveBankModal close={toggleRemoveBankModal} bank={managedBank} />}
      {setAsActiveBankModalIsOpen && <SetAsActiveBankModal close={toggleSetAsActiveBankModal} bank={managedBank} />}
    </div>
  );
};

export default Bank;
