import React from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@renderer/types/store';

import './Left.scss';

const Left = () => {
  const banks = useSelector((state: RootState) => state.banks);
  const points = useSelector((state: RootState) => state.points);
  const validators = useSelector((state: RootState) => state.validators);

  return (
    <div className="Left">
      <div className="Left__points">
        Points: <span>{points.toLocaleString()}</span>
      </div>
      <div className="Left__network-overview">
        <div className="network-overview__title">Network</div>
        <div className="network-overview__overview">
          <span>Banks: {banks.length}</span>
          <span>Validators: {validators.length}</span>
        </div>
      </div>
      <div className="Left__links">
        <a href="#">API Documentation</a>
        <a href="#">Tutorial & Guides</a>
        <a href="#">Settings</a>
      </div>
    </div>
  );
};

export default Left;
