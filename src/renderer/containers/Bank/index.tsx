import React from 'react';

import './Bank.scss';

const Bank = () => {
  return (
    <div className="Bank">
      <div className="Bank__header">
        <div className="header__title">
          Your Bank: 223.125.11.178 <span className="title__points">98.62</span>
        </div>
      </div>
      <div>
        <span>first</span>
        <span>second</span>
      </div>
      <div className="Bank__content">Stuff</div>
    </div>
  );
};

export default Bank;
