import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {getBankConfigs} from '@renderer/selectors';
import {AppDispatch, BaseValidator} from '@renderer/types';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import yup from '@renderer/utils/yup';

import PurchaseConfirmationServicesModalFields from './PurchaseConfirmationServicesModalFields';
import './PurchaseConfirmationServicesModal.scss';

interface ComponentProps {
  close(): void;
  validator: BaseValidator;
}

const PurchaseConfirmationServicesModal: FC<ComponentProps> = ({close, validator}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const bankConfigs = useSelector(getBankConfigs);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      bankAddress: '',
    }),
    [],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async ({bankAddress}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      displayToast(bankAddress, 'success');
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      bankAddress: yup
        .string()
        .test('bank-has-sk', 'Signing key required to purchase confirmation services.', async (address) => {
          const bankConfig = bankConfigs[address];

          if (!bankConfig) {
            try {
              setSubmitting(true);
              const config = await dispatch(fetchBankConfig(address));

              if (config.error) {
                displayErrorToast(config.error);
                setSubmitting(false);
                return false;
              }
            } catch (error) {
              return false;
            } finally {
              setSubmitting(false);
            }
          }

          return address === 'http://143.110.137.54';
        })
        .test(
          'bank-has-nid-sk',
          'NID signing key required to purchase confirmation services.',
          (address) => address === 'http://143.110.137.54',
        )
        .required('This field is required'),
    });
  }, [bankConfigs, dispatch]);

  return (
    <Modal
      className="PurchaseConfirmationServicesModal"
      close={close}
      header="Purchase Confirmation Services"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Purchase"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <PurchaseConfirmationServicesModalFields submitting={submitting} validator={validator} />
    </Modal>
  );
};

export default PurchaseConfirmationServicesModal;
