import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import BankAccounts from '@renderer/containers/Bank/BankAccounts';
import BankBanks from '@renderer/containers/Bank/BankBanks';
import BankBlocks from '@renderer/containers/Bank/BankBlocks';
import BankConfirmationBlocks from '@renderer/containers/Bank/BankConfirmationBlocks';
import BankInvalidBlocks from '@renderer/containers/Bank/BankInvalidBlocks';
import BankOverview from '@renderer/containers/Bank/BankOverview';
import BankTransactions from '@renderer/containers/Bank/BankTransactions';
import BankValidators from '@renderer/containers/Bank/BankValidators';
import DeleteBankModal from '@renderer/containers/Bank/DeleteBankModal';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

import useBooleanState from '@renderer/hooks/useBooleanState';

import './Bank.scss';

const Bank: FC = () => {
  const {nid} = useParams();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: toggleEditModal,
    },
    {
      label: 'Remove Bank',
      onClick: toggleDeleteModal,
    },
  ];

  const renderRightPageHeaderButtons = (): ReactNode => <Button>Add to Managed Banks</Button>;

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
        content: <BankValidators />,
        page: 'validators',
      },
    ];

    return (
      <Switch>
        {tabContentRoutes.map(({content, page}) => (
          <Route path={`${path}/${page}`}>{content}</Route>
        ))}
      </Switch>
    );
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={dropdownMenuOptions}
        rightContent={renderRightPageHeaderButtons()}
        title={`Digital Ocean Bank (${nid})`}
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
            name: 'Confirmation Blocks',
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
        ]}
      />
    </>
  );

  return (
    <div className="Bank">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteModalIsOpen && <DeleteBankModal toggleDeleteModal={toggleDeleteModal} />}
      {editModalIsOpen && <EditBankModal close={toggleEditModal} />}
    </div>
  );
};

export default withRouter(Bank);
