import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '@renderer/components/FormElements';
import PageTable, {PageTableData, PageTableItems} from '@renderer/components/PageTable';
import Pagination from '@renderer/components/Pagination';
import {fetchBankValidatorConfirmationServices} from '@renderer/dispatchers/banks';
import useAddress from '@renderer/hooks/useAddress';
import {getBankValidatorConfirmationServices} from '@renderer/selectors';
import {unsetBankValidatorConfirmationServices} from '@renderer/store/banks';
import {AppDispatch} from '@renderer/types/store';

enum TableKeys {
  createdDate,
  end,
  id,
  modifiedDate,
  start,
  validator,
}

const BankValidatorConfirmationServices: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankValidatorConfirmationServicesObject = useSelector(getBankValidatorConfirmationServices);
  const bankValidatorConfirmationServices = bankValidatorConfirmationServicesObject[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankValidatorConfirmationServices(bankAddress));
      setLoading(false);
    };

    fetchData();

    return () => {
      dispatch(unsetBankValidatorConfirmationServices({address: bankAddress}));
    };
  }, [bankAddress, dispatch]);

  const bankValidatorConfirmationServicesTableData = useMemo<PageTableData[]>(
    () =>
      bankValidatorConfirmationServices?.results.map((validatorConfirmationService) => ({
        key: validatorConfirmationService.id,
        [TableKeys.createdDate]: validatorConfirmationService.created_date,
        [TableKeys.end]: validatorConfirmationService.end,
        [TableKeys.id]: validatorConfirmationService.id,
        [TableKeys.modifiedDate]: validatorConfirmationService.modified_date,
        [TableKeys.start]: validatorConfirmationService.start,
        [TableKeys.validator]: validatorConfirmationService.validator,
      })) || [],
    [bankValidatorConfirmationServices],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankValidatorConfirmationServicesTableData,
      headers: {
        [TableKeys.createdDate]: 'Created',
        [TableKeys.end]: 'End',
        [TableKeys.id]: 'ID',
        [TableKeys.modifiedDate]: 'Modified',
        [TableKeys.start]: 'Start',
        [TableKeys.validator]: 'Validator',
      },
      orderedKeys: [
        TableKeys.createdDate,
        TableKeys.end,
        TableKeys.id,
        TableKeys.modifiedDate,
        TableKeys.start,
        TableKeys.validator,
      ],
    }),
    [bankValidatorConfirmationServicesTableData],
  );

  return (
    <div className="BankValidatorConfirmationServices">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTable items={pageTableItems} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default BankValidatorConfirmationServices;
