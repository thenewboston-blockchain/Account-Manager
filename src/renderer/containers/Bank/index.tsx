import React from 'react';

import {Button} from '@renderer/components/FormElements';
import DropdownMenuButton, {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import Icon from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTable from '@renderer/containers/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import TrustBadge from '@renderer/components/TrustBadge';

import useBooleanState from '@renderer/hooks/useBooleanState';

import './Bank.scss';
import sampleData from '@renderer/mock/OverviewSampleData';

const Bank = () => {
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);
  const [unregisterBankModalIsOpen, toggleUnregisterBankModal] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: toggleEditModal,
    },
    {
      label: 'Delete Account',
      onClick: toggleDeleteModal,
    },
    {
      label: 'Unregister Bank',
      onClick: toggleUnregisterBankModal,
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

  const renderContent = () => (
    <>
      <PageTable items={sampleData}/>
      <Pagination />
    </>
  );

  const renderDeleteModal = () => (
    <Modal
      cancelButton="No"
      className="Bank__DeleteModal"
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
    return (
      <>
        <TrustBadge score={98.34} />
        <DropdownMenuButton options={dropdownMenuOptions} />
      </>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button variant="outlined">Add to Managed Banks</Button>
      <Button>Register as Member</Button>
    </>
  );

  const renderTop = () => (
    <>
      <PageHeader
        leftTools={renderLeftTools()}
        rightContent={renderRightPageHeaderButtons()}
        title="Digital Ocean Bank (223.125.111.178)"
      />
      <PageTabs
        items={[
          {
            name: 'Overview',
            active: true,
          },
          {
            name: 'Members',
            active: false,
          },
          {
            name: 'Transactions',
            active: false,
          },
          {
            name: 'Banks',
            active: false,
          },
          {
            name: 'Validators',
            active: false,
          },
        ]}
      />
    </>
  );

  const renderUnregisterBankModal = () => (
    <Modal close={toggleUnregisterBankModal} header="Unregister Bank" onSubmit={toggleUnregisterBankModal}>
      Here is the modal used very minimally. It is using most of modal's defaults, and it's not using any custom header
      or footer
    </Modal>
  );

  return (
    <div className="Bank">
      <PageLayout content={renderContent()} top={renderTop()} />
      {deleteModalIsOpen && renderDeleteModal()}
      {editModalIsOpen && <EditBankModal close={toggleEditModal} />}
      {unregisterBankModalIsOpen && renderUnregisterBankModal()}
    </div>
  );
};

export default Bank;
