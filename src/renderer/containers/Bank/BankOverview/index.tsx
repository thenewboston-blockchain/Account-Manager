import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import DetailPanel from '@renderer/components/DetailPanel';
import {Loader} from '@renderer/components/FormElements';
import {fetchBankConfig} from '@renderer/dispatchers/banks';
import {useAddress} from '@renderer/hooks';
import {getBankConfigs} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';

import './BankOverview.scss';

const BankOverview: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const bankAddress = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const bankConfigs = useSelector(getBankConfigs);
  const bankConfig = bankConfigs[bankAddress];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(fetchBankConfig(bankAddress));
      setLoading(false);
    };

    fetchData();
  }, [bankAddress, dispatch]);

  return (
    <div className="BankOverview">
      {loading ? (
        <Loader />
      ) : (
        <DetailPanel
          items={[
            {
              key: 'Account Number',
              value: bankConfig.data.account_number,
            },
            {
              key: 'IP Address',
              value: bankConfig.data.ip_address,
            },
            {
              key: 'Network ID',
              value: bankConfig.data.node_identifier,
            },
            {
              key: 'Port',
              value: bankConfig.data.port,
            },
            {
              key: 'Protocol',
              value: bankConfig.data.protocol,
            },
            {
              key: 'Version',
              value: bankConfig.data.version,
            },
            {
              key: 'Transaction Fee',
              value: bankConfig.data.default_transaction_fee,
            },
            {
              key: 'Node Type',
              value: bankConfig.data.node_type,
            },
          ]}
          title="Bank Information"
        />
      )}
    </div>
  );
};

export default BankOverview;
