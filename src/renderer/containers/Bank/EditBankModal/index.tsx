import React, {FC} from 'react';

import Modal from '@renderer/components/Modal';
import useBooleanState from '@renderer/hooks/useBooleanState';
import Icon from '@renderer/components/Icon';
import {FormButton, FormInput} from '@renderer/components/FormComponents';

import './EditBankModal.scss';

interface ComponentProps {
  close(): void;
}

const initialValues = {name: '', type: ''};

type Values = typeof initialValues;

const EditBankModal: FC<ComponentProps> = ({close}) => {
  const [submitting, , setSubmittingTrue, setSubmittingFalse] = useBooleanState(false);

  const handleSubmit = (values: Values) => {
    setSubmittingTrue();
    try {
      console.log('VALUES', values);
      setTimeout(() => {
        setSubmittingFalse();
        close();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const renderFooter = () => {
    return (
      <>
        <div className="footer-left-text">Here's some left text to showcase custom footer</div>
        <FormButton className="Modal__default-cancel" onClick={close} variant="outlined">
          No
        </FormButton>
        <FormButton className="Modal__default-submit" type="submit">
          Yes
        </FormButton>
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <Icon className="Icon__arrow" icon="arrow_forward" />
        <h2 className="Modal__title">Edit Account</h2>
      </>
    );
  };

  return (
    <Modal
      className="EditBankModal"
      close={close}
      footer={renderFooter()}
      header={renderHeader()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
      style={{left: '100px', top: '30px', width: 500}}
    >
      <p>
        Here is a bs form. Most of the modal's logic can be contained in a component like this, instead of polluting the
        parent element. I also decided to showcase how Forms can work, and how we can send custom footer and header
        element. This is also custom positioned.
      </p>
      <FormInput label="Name" name="name" />
      <FormInput label="Type" name="type" />
    </Modal>
  );
};

export default EditBankModal;
