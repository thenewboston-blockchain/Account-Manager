import React, {FC, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useRouteMatch, withRouter} from 'react-router-dom';

import BankAccounts from '@renderer/containers/Bank/BankAccounts';
import BankBanks from '@renderer/containers/Bank/BankBanks';
import BankBlocks from '@renderer/containers/Bank/BankBlocks';
import BankConfirmationBlocks from '@renderer/containers/Bank/BankConfirmationBlocks';
import BankInvalidBlocks from '@renderer/containers/Bank/BankInvalidBlocks';
import BankOverview from '@renderer/containers/Bank/BankOverview';
import BankTransactions from '@renderer/containers/Bank/BankTransactions';
import BankValidatorConfirmationServices from '@renderer/containers/Bank/BankValidatorConfirmationServices';
import BankValidators from '@renderer/containers/Bank/BankValidators';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useAddress, useBooleanState} from '@renderer/hooks';
import {getActiveBank, getIsActiveBank, getIsManagedBank} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {setManagedBank, unsetManagedBank} from '@renderer/store/app';
import {parseAddressData} from '@renderer/utils/address';

import './Bank.scss';

const Bank: FC = () => {
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const {path, url} = useRouteMatch();
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);
  const activeBank = useSelector(getActiveBank)!;
  const isActiveBank = useSelector(getIsActiveBank(address));
  const isManagedBank = useSelector(getIsManagedBank(address));

  const getDropdownMenuOptions = (): DropdownMenuOption[] => {
    if (!isManagedBank) return [];
    return [
      {
        label: 'Edit',
        onClick: toggleEditModal,
      },
      {
        label: 'Remove Bank',
        onClick: handleRemoveManagedBank,
      },
    ];
  };

  const handleAddManagedBank = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      setManagedBank({
        ip_address: ipAddress,
        nickname: '',
        port,
        protocol,
      }),
    );
  };

  const handleRemoveManagedBank = (): void => {
    const {ipAddress, port, protocol} = parseAddressData(address);
    dispatch(
      unsetManagedBank({
        ip_address: ipAddress,
        nickname: '',
        port,
        protocol,
      }),
    );
  };

  const renderRightPageHeaderButtons = (): ReactNode => {
    if (isActiveBank || isManagedBank) return null;
    return <Button onClick={handleAddManagedBank}>Add to Managed Banks</Button>;
  };

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <BankAccounts />,
        page: 'accounts',
      },
      {
        content: <BankBanks />,
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
        content: <BankValidators />,
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
    if (isActiveBank) return activeBank.nickname || activeBank.ip_address;
    const {ipAddress} = parseAddressData(address);
    return ipAddress;
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={getDropdownMenuOptions()}
        rightContent={renderRightPageHeaderButtons()}
        title={renderTitle()}
        trustScore={98.34}
      />
      <PageTabs
        baseUrl={url}
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
      {editModalIsOpen && <EditBankModal close={toggleEditModal} />}
    </div>
  );
};

export default withRouter(Bank);
