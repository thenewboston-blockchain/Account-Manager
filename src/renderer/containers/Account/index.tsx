import React from 'react';
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
import './Account.scss';
import {FormButton, FormInput, FormSelect, FormSelectDetailed} from '@renderer/components/FormComponents';
import {SelectOption} from '@renderer/types/forms';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';

const initialPointsToSendValues = {
  points: '0.00',
};

type FormValues = typeof initialPointsToSendValues;

const Account = () => {
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [submittingDeleteModal, , setSubmittingDeleteModalTrue, setSubmittingDeleteModalFalse] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);

  const handlePointsToSendSubmit = ({points}: FormValues): void => {
    console.log(points);
  };

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

  const accountFromSelectFieldOptions: SelectOption[] = [
    '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    '2cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdq',
    '4cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdw',
    '3cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acde',
    '5cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdr',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
  ].map((acc) => ({label: 'Amy', value: acc}));

  const accountToSelectFieldOptions: SelectOption[] = [
    '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    '2cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdq',
    '4cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdw',
    '3cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acde',
    '5cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdr',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
    '6cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdt',
  ].map((acc) => ({label: 'Amy', value: acc}));

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

  const renderSendPointsModal = () => (
    <Modal
      className="Account__SendPointsModal"
      style={{left: '50%', transform: 'translate(-50%, -50%)', top: '50%', width: 384}}
      close={toggleSendPointsModal}
      initialValues={initialPointsToSendValues}
      footer={
        <>
          <FormButton className="Modal__default-cancel" onClick={toggleSendPointsModal} variant="link">
            Cancel
          </FormButton>
          <FormButton className="Modal__default-submit" type="submit">
            Send
          </FormButton>
        </>
      }
      header={
        <>
          <h2>Send Points</h2>
        </>
      }
      onSubmit={handlePointsToSendSubmit}
    >
      <>
        <FormSelectDetailed
          className="acc-form-select"
          required
          label="From: Account"
          options={accountFromSelectFieldOptions}
          name="selectFromAcc"
        />
        <FormSelectDetailed
          className="acc-form-select"
          required
          label="To: Friend"
          options={accountToSelectFieldOptions}
          name="selectToAcc"
        />
        <table>
          <tr>
            <td>Account Balance</td>
            <td>
              <span className="acc-balance">0.00</span>
            </td>
          </tr>
          <tr>
            <td>
              Points
              <RequiredAsterisk />
            </td>
            <td>
              <FormInput className="points-input" name="points" placeholder="0.00" type="number" />
            </td>
          </tr>
          <tr>
            <td>Bank Registration Fee</td>
            <td>0.01</td>
          </tr>
          <tr>
            <td>Validator Tx Fee</td>
            <td>0.02</td>
          </tr>
          <tr>
            <td>TOTAL Tx</td>
            <td>
              <b>0.00</b>
            </td>
          </tr>
        </table>
      </>
    </Modal>
  );

  return (
    <div className="Account">
      <PageLayout content={renderDetailPanels()} top={renderTop()} />
      {deleteModalIsOpen && renderDeleteModal()}
      {sendPointsModalIsOpen && renderSendPointsModal()}
    </div>
  );
};

export default Account;
