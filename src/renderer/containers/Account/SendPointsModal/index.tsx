import React, {FC, ReactNode} from 'react';
import * as Yup from 'yup';
import {FormButton, FormInput, FormSelectDetailed} from '@renderer/components/FormComponents';
import Modal from '@renderer/components/Modal';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {SelectOption} from '@renderer/types/forms';
import './SendPointsModal.scss';
import Icon, {IconType} from '@renderer/components/Icon';
import axios from 'axios';
import {sign} from 'tweetnacl';
import useBooleanState from '@renderer/hooks/useBooleanState';

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
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
  'e0ba29c1c493d01a5f665db55a4bd77caa140cf9722d0ed367ce4183230d2e02',
].map((acc) => ({label: 'Amy', value: acc}));

const accountToSelectFieldOptions: SelectOption[] = [
  '2157d41e4863baa69ee3b76c5027686116f248cf84bade80cdfda9d2c62f72c4',
  '2157d41e4863baa69ee3b76c5027686116f248cf84bade80cdfda9d2c62f72c4',
  '2157d41e4863baa69ee3b76c5027686116f248cf84bade80cdfda9d2c62f72c4',
].map((acc) => ({label: 'Amy', value: acc}));

interface ComponentProps {
  close(): void;
}

const SendPointsModal: FC<ComponentProps> = ({close}) => {
  const [sendingPoints, toggleSendingPoints, , pointsSent] = useBooleanState(false);

  const handleSubmit = ({points, fromAccount, toAccount}: FormValues): void => {
    toggleSendingPoints();
    const {secretKey} = sign.keyPair();
    const secretKeyHex = Buffer.from(secretKey).toString('hex');
    axios
      .get('http://167.99.173.247/config')
      .then((nodeConfig) => {
        axios
          .get(
            'http://64.225.47.205/account_balance_lock/ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
          )
          .then((balanceLockResponse) => {
            axios
              .post('http://167.99.173.247/blocks', {
                account_number: fromAccount,
                message: {
                  balance_key: balanceLockResponse.data.balance_lock,
                  txs: [
                    {
                      amount: points,
                      recipient: toAccount,
                    },
                    {
                      amount: nodeConfig.data.default_transaction_fee,
                      recipient: nodeConfig.data.account_number,
                    },
                    {
                      amount: nodeConfig.data.primary_validator.default_transaction_fee,
                      recipient: nodeConfig.data.primary_validator.account_number,
                    },
                  ],
                },
                signature: secretKeyHex,
              })
              .then((block) => {
                console.log(block);
                pointsSent();
              })
              .catch((err) => {
                pointsSent();
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
            pointsSent();
          });
      })
      .catch((err) => {
        console.error(err);
        pointsSent();
      });
  };

  const renderFooter = (): ReactNode => {
    return (
      <>
        <FormButton className="Modal__default-cancel SendPointsModal__default-cancel" onClick={close} variant="link">
          Cancel
        </FormButton>
        <FormButton
          submitting={sendingPoints}
          className="Modal__default-submit SendPointsModal__default-submit"
          type="submit"
        >
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
                <span className="SendPointsModal__acc-balance">0.00</span>
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
