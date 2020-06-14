import React from 'react';

import './Pagination.scss';

const Pagination = () => {
  const renderSamplePages = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <a className={`page ${i == 1 ? 'active' : ''}`} href="#" key={i}>
        {i}
      </a>
    ));
  };

  return (
    <div className="Pagination">
      <a className="prev-button" href="#">
        {'<< Prev'}
      </a>
      <div className="pages">{renderSamplePages()}</div>
      <a className="next-button" href="#">
        {'Next >>'}
      </a>
    </div>
  );
};

export default Pagination;
