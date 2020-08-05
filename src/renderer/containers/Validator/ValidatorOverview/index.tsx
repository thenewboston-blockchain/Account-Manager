import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import {Validator} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

import './ValidatorOverview.scss';

const ValidatorOverview: FC = () => {
  const {nid} = useParams();
  const networkValidator = useSelector((state: RootState) => state.configs.validatorConfigs[nid]);
  const [validator, setValidator] = useState<Validator | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = networkValidator;
      const address = formatAddress(ipAddress, port, protocol);
      const {data} = await axios.get(`${address}/config`);
      setValidator(data);
    };
    fetchData();
  }, [networkValidator]);

  const renderDetailPanel = (): ReactNode => {
    if (!validator) return null;
    return (
      <DetailPanel
        items={[
          {
            key: 'Account Number',
            value: validator.account_number,
          },
          {
            key: 'IP Address',
            value: validator.ip_address,
          },
          {
            key: 'Network ID',
            value: validator.node_identifier,
          },
          {
            key: 'Port',
            value: validator.port || '-',
          },
          {
            key: 'Protocol',
            value: validator.protocol,
          },
          {
            key: 'Version',
            value: validator.version,
          },
          {
            key: 'Transaction Fee',
            value: validator.default_transaction_fee,
          },
          {
            key: 'Node Type',
            value: validator.node_type,
          },
        ]}
        title="Validator Information"
      />
    );
  };

  return <div className="ValidatorOverview">{renderDetailPanel()}</div>;
};

export default ValidatorOverview;
