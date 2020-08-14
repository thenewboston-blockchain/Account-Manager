import React, {FC, ReactNode} from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import {FormButton, FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {SelectOption, Tx} from '@renderer/types';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';

import './SendPointsModal.scss';

const initialValues = {
  fromAccount: '',
  points: '0.00',
  toAccount: '',
};

const validationSchema = Yup.object().shape({
  fromAccount: Yup.string().required('This field is required'),
  points: Yup.number().moreThan(0, 'Must be greater than 0').required('This field is required'),
  toAccount: Yup.string().required('This field is required'),
});

type FormValues = typeof initialValues;

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
].map((acc) => ({label: 'Amy', value: acc}));

interface ComponentProps {
  close(): void;
}

const txs: Tx[] = [
  {
    amount: 5.5,
    recipient: '484b3176c63d5f37d808404af1a12c4b9649cd6f6769f35bdf5a816133623fbc',
  },
  {
    amount: 1,
    recipient: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
  },
  {
    amount: 4,
    recipient: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
  },
];

const SendPointsModal: FC<ComponentProps> = ({close}) => {
  const createBlock = async (): Promise<void> => {
    const signingKeyHex = '4e5804d995d5ab84afb85154d7645c73c8fedb80723a262787c2428e59051b58';
    const {accountNumberHex, signingKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
    const balanceLock = 'c88d1b0d55f430b66ad603993b76d7e9bd147b7209e13b2bb548fb680905dc8d';
    const block = generateBlock(accountNumberHex, balanceLock, signingKey, txs);
    const response = await axios.post('http://167.99.173.247/blocks', block, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.error(response);
  };

  const handleSubmit = ({points}: FormValues): void => {
    console.log(points);
  };

  const renderFooter = (): ReactNode => {
    return (
      <>
        <FormButton className="Modal__default-cancel SendPointsModal__default-cancel" onClick={close} variant="link">
          Cancel
        </FormButton>
        <FormButton className="Modal__default-submit SendPointsModal__default-submit" type="submit">
          Send <Icon className="SendPointsModal__submit-icon" icon={IconType.tnb} size={16} />
        </FormButton>
      </>
    );
  };

  return (
    <Modal
      className="SendPointsModal"
      close={close}
      footer={renderFooter()}
      header="Send Points"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <>
        <FormSelectDetailed
          className="SendPointsModal__select"
          required
          label="From: Account"
          options={accountFromSelectFieldOptions}
          name="fromAccount"
        />
        <FormSelectDetailed
          className="SendPointsModal__select"
          required
          label="To: Friend"
          options={accountToSelectFieldOptions}
          name="toAccount"
        />
        <table className="SendPointsModal__table">
          <tbody>
            <tr>
              <td>Account Balance</td>
              <td>
                <span className="SendPointsModal__account-balance">0.00</span>
              </td>
            </tr>
            <tr>
              <td>
                Points
                <RequiredAsterisk />
              </td>
              <td>
                <FormInput
                  className="SendPointsModal__points-input"
                  hideError
                  name="points"
                  placeholder="0.00"
                  type="number"
                />
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
            <tr className="SendPointsModal__total-tr">
              <td>TOTAL Tx</td>
              <td>
                <b>0.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </Modal>
  );
};

export default SendPointsModal;
