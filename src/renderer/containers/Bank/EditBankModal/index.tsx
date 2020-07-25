import React, {FC, ReactNode} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import {FormButton, FormInput, FormSelect} from '@renderer/components/FormComponents';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {SelectOption} from '@renderer/types/forms';

import './EditBankModal.scss';

interface ComponentProps {
  close(): void;
}

const selectFieldOptions: SelectOption[] = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'squirtle',
  'wartortle',
  'blastoise',
  'charmander',
  'charmeleon',
  'charizard',
  'pikachu',
].map((poke) => ({label: poke[0].toUpperCase() + poke.slice(1), value: poke}));

const initialValues = {
  address1: '',
  address2: '',
  city: '',
  name: '',
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: '',
  question6: '',
  question7: '',
  question8: '',
  question9: '',
  question10: '',
  selectField: selectFieldOptions[0].value,
  state: '',
  type: '',
  zip: '',
};

type Values = typeof initialValues;

const EditBankModal: FC<ComponentProps> = ({close}) => {
  const [submitting, , setSubmittingTrue, setSubmittingFalse] = useBooleanState(false);

  const handleSubmit = (values: Values): void => {
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

  const renderFooter = (): ReactNode => {
    return (
      <>
        <div className="EditBankModal__footer-left">Here&apos;s some left text to showcase custom footer</div>
        <FormButton className="Modal__default-cancel" onClick={close} variant="outlined">
          No
        </FormButton>
        <FormButton className="Modal__default-submit" type="submit">
          Yes
        </FormButton>
      </>
    );
  };

  const renderHeader = (): ReactNode => {
    return (
      <>
        <Icon className="EditBankModal__header-icon" icon={IconType.arrowRight} />
        <h2 className="EditBankModal__title">Edit Account</h2>
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
        Here is a bs form. Most of the modal&apos;s logic can be contained in a component like this, instead of
        polluting the parent element. I also decided to showcase how Forms can work, and how we can send custom footer
        and header element. This is also custom positioned.
      </p>
      <FormInput label="Name" name="name" />
      <FormInput label="Address 1" name="address1" />
      <FormInput label="Address 2" name="address2" />
      <FormInput label="City" name="city" />
      <FormInput label="State" name="state" />
      <FormInput label="Zip Code" name="zip" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <FormInput label={`Question ${i + 1}`} name={`question${i + 1}`} />
      ))}
      <FormInput label="Question 1" name="question1" />
      <FormInput label="Type" name="type" />
      <FormSelect label="Pokemon" options={selectFieldOptions} name="selectField" />
    </Modal>
  );
};

export default EditBankModal;
