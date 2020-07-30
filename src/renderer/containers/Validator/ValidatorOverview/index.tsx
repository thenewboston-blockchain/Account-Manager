import React from 'react';

import DetailPanel from '@renderer/components/DetailPanel';

import './ValidatorOverview.scss';

const ValidatorOverview = () => {
  return (
    <div className="ValidatorOverview">
      <DetailPanel
        items={[
          {
            key: 'Account Number',
            value: 'Valida5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8tor',
          },
          {
            key: 'IP Address',
            value: '167.99.173.247',
          },
          {
            key: 'Network ID',
            value: 'd5356888dc9303e44ce52b1e06c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1',
          },
          {
            key: 'Port',
            value: '',
          },
          {
            key: 'Protocol',
            value: 'http',
          },
          {
            key: 'Version',
            value: 'v1.0',
          },
          {
            key: 'Transaction Fee',
            value: '1.0000000000000000',
          },
          {
            key: 'Node Type',
            value: 'Bank',
          },
        ]}
        title="Validator Information"
      />
    </div>
  );
};

export default ValidatorOverview;
