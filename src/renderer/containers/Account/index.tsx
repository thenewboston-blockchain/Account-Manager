import React, {FC, ReactNode, useState} from 'react';
import noop from 'lodash/noop';

import {Button} from '@renderer/components/FormElements';
import DetailPanel from '@renderer/components/DetailPanel';
import DropdownMenuButton, {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTable from '@renderer/components/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import QR from '@renderer/components/QR';

import useBooleanState from '@renderer/hooks/useBooleanState';
import transactionSampleData from '@renderer/mock/TransactionSampleData';

import SendPointsModal from './SendPointsModal';

import './Account.scss';

enum Tabs {
  OVERVIEW = 'Overview',
  TRANSACTIONS = 'Transactions',
}
const tabs = [Tabs.OVERVIEW, Tabs.TRANSACTIONS];

const Account: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: noop,
    },
    {
      label: 'Delete Account',
      onClick: toggleDeleteModal,
    },
  ];

  const handleDeleteAccountFromModal = async (): Promise<void> => {
    setSubmittingDeleteModalTrue();
    setTimeout(() => {
      setSubmittingDeleteModalFalse();
      toggleDeleteModal();
    }, 1000);
  };

  const renderDeleteModal = (): ReactNode => (
    <Modal
      cancelButton="Cancel"
      className="AccountDeleteModal"
      close={toggleDeleteModal}
      header={
        <>
          <Icon className="AccountDeleteModal__icon" icon={IconType.alert} />
          <h2 className="AccountDeleteModal__title">Delete Account</h2>
        </>
      }
      onSubmit={handleDeleteAccountFromModal}
      submitButton="Yes"
      submitting={submittingDeleteModal}
    >
      <>
        <span className="AccountDeleteModal__warning-span">Warning: </span> If you delete your account, you will lose
        all the points in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );

  const renderDetailPanels = (): ReactNode => {
    return (
      <div className="Account__panels">
        <DetailPanel
          className="Account__DetailPanel"
          items={[
            {
              key: 'Balance',
              value: '184.35',
            },
            {
              key: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              key: 'Signing Key',
              value: '**************************',
            },
            {
              key: 'QR Code',
              value: <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />,
            },
          ]}
          title="Account Info"
        />
        <DetailPanel
          className="Account__DetailPanel"
          items={[
            {
              key: 'Network ID',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              key: 'Account Number',
              value: 'Account Number',
            },
            {
              key: 'Protocol',
              value: 'http',
            },
          ]}
          title="Bank Info"
        />
      </div>
    );
  };

  const renderLeftTools = (): ReactNode => {
    return <DropdownMenuButton options={dropdownMenuOptions} />;
  };

  const renderPageTable = (): ReactNode => (
    <>
      <PageTable items={transactionSampleData} />
      <Pagination />
    </>
  );

  const renderRightPageHeaderButtons = (): ReactNode => (
    <>
      <Button onClick={toggleSendPointsModal}>Send Points</Button>
    </>
  );

  const renderTabContent = (activeTabParam: Tabs): ReactNode => {
    const tabContent = {
      [Tabs.OVERVIEW]: renderDetailPanels(),
      [Tabs.TRANSACTIONS]: renderPageTable(),
    };
    return tabContent[activeTabParam] || null;
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        leftTools={renderLeftTools()}
        rightContent={renderRightPageHeaderButtons()}
        title="Donations (43hawrjkef243d)"
      />
      <PageTabs
        items={tabs.map((item) => ({
          active: activeTab === item,
          name: item.toString(),
          onClick: (name) => {
            setActiveTab(name as Tabs);
          },
        }))}
      />
    </>
  );

  return (
    <div className="Account">
      <PageLayout content={renderTabContent(activeTab)} top={renderTop()} />
      {deleteModalIsOpen && renderDeleteModal()}
      {sendPointsModalIsOpen && <SendPointsModal close={toggleSendPointsModal} />}
    </div>
  );
};

export default Account;
