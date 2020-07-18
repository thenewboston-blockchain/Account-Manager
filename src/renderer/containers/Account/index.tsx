import React, {FC, useState} from 'react';
import noop from 'lodash/noop';

import DetailPanel from '@renderer/containers/DetailPanel';
import DropdownMenuButton, {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import Icon from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import QR from '@renderer/components/QR';
import {Button} from '@renderer/components/FormElements';
import useBooleanState from '@renderer/hooks/useBooleanState';

import SendPointsModal from './SendPointsModal';
import './Account.scss';
import PageTable from '../PageTable';
import Pagination from '@renderer/components/Pagination';

const Account: FC = () => {
  const tabs = ['Overview', 'Transactions'];
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);
  const [activeTabName, setActiveTab] = useState(tabs[0]);

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
    try {
      setSubmittingDeleteModalTrue();
      setTimeout(() => {
        setSubmittingDeleteModalFalse();
        toggleDeleteModal();
      }, 1000);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const renderDetailPanels = () => {
    return (
      <div className="detail-panels">
        <DetailPanel
          items={[
            {
              attribute: 'Balance',
              value: '184.35',
            },
            {
              attribute: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Signing Key',
              value: '**************************',
            },
            {
              attribute: 'QR Code',
              value: <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />,
            },
          ]}
          title="Account Info"
        />
        <DetailPanel
          items={[
            {
              attribute: 'Network ID',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Account Number',
              value: 'Account Number',
            },
            {
              attribute: 'Protocol',
              value: 'http',
            },
          ]}
          title="Bank Info"
        />
      </div>
    );
  };

  const renderDeleteModal = () => (
    <Modal
      cancelButton="Cancel"
      className="Account__DeleteModal"
      close={toggleDeleteModal}
      header={
        <>
          <Icon className="Icon__warning" icon="warning" />
          <h2 className="Modal__title">Delete Account</h2>
        </>
      }
      onSubmit={handleDeleteAccountFromModal}
      submitButton="Yes"
      submitting={submittingDeleteModal}
    >
      <>
        <span className="delete-warning-span">Warning: </span> If you delete your account, you will lose all the points
        in your account as well as your signing key. Are you sure you want to delete your account?
      </>
    </Modal>
  );

  const renderLeftTools = () => {
    return <DropdownMenuButton options={dropdownMenuOptions} />;
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button onClick={toggleSendPointsModal}>Send Points</Button>
    </>
  );

  const renderTop = () => (
    <>
      <PageHeader
        leftTools={renderLeftTools()}
        rightContent={renderRightPageHeaderButtons()}
        title="Donations (43hawrjkef243d)"
      />
      <PageTabs
        items={tabs.map(
          (item) =>({
            name: item,
            active: activeTabName === item ? true : false,
            onClick: (name) => {
              setActiveTab(name)
            }
          })
        )}
      />
    </>
  );

  return (
    <div className="Account">
      <PageLayout content={renderDetailPanels()} top={renderTop()} />
      {deleteModalIsOpen && renderDeleteModal()}
      {sendPointsModalIsOpen && <SendPointsModal close={toggleSendPointsModal} />}
    </div>
  );
};

export default Account;
