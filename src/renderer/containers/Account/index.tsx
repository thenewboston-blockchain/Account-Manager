import React from 'react';

import {Button} from '@renderer/components/FormElements';
import DetailPanel from '@renderer/containers/DetailPanel';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import QR from '@renderer/components/QR';
import './Account.scss';
import DropdownMenuButton, {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import useBooleanState from '@renderer/hooks/useBooleanState';
import Modal from '@renderer/components/Modal';
import Icon from '@renderer/components/Icon';

const Account = () => {
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: () => null,
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
              value: <span className="balance__amount">184.35</span>,
            },
            {
              attribute: 'Account Number',
              value: (
                <div>
                  <p>0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb</p>
                  <QR text="0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb" />
                </div>
              ),
            },
            {
              attribute: 'Signing Key',
              value: (
                <div>
                  <span>**************************</span>
                  <a className="show-signing-key">Show</a>
                </div>
              ),
            },
          ]}
          title="Personal Info"
        />
        <DetailPanel
          items={[
            {
              attribute: 'Network ID',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              attribute: 'Protocol',
              value: 'http',
            },
            {
              attribute: 'IP Address',
              value: <span className="ip-address">223.125.111.178</span>,
            },
            {
              attribute: 'Port',
              value: '80',
            },
            {
              attribute: 'Version',
              value: 'w87Cx0Wir',
            },
            {
              attribute: 'Default Tx Fee',
              value: '2 Points',
            },
            {
              attribute: 'Registered',
              value: 'v1.0',
            },
            {
              attribute: 'Trust',
              value: '2 Points',
            },
            {
              attribute: 'Network Trust Avg',
              value: 'v1.0',
            },
          ]}
          title="Bank Info"
        />
      </div>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button>Send Points</Button>
    </>
  );

  const renderLeftPageHeaderTools = () => <DropdownMenuButton options={dropdownMenuOptions} />;

  const renderTop = () => (
    <>
      <PageHeader
        leftTools={renderLeftPageHeaderTools()}
        rightContent={renderRightPageHeaderButtons()}
        title="Donations (43hawrjkef243d)"
      />
      <PageTabs
        items={[
          {
            name: 'Overview',
            active: true,
          },
          {
            name: 'Transactions',
            active: false,
          },
        ]}
      />
    </>
  );

  const renderDeleteModal = () => (
    <Modal
      cancelButton="No"
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

  return (
    <div className="Account">
      <PageLayout content={renderDetailPanels()} top={renderTop()} />
      {deleteModalIsOpen && renderDeleteModal()}
    </div>
  );
};

export default Account;
