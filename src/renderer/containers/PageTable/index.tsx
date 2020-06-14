import React from 'react';

import './PageTable.scss';

const PageTable = () => {
  const renderSampleRows = () => {
    return [...Array(100)].map((_, i) => (
      <tr key={i}>
        <td>Network ID</td>
        <td>Account Number</td>
        <td>Protocol</td>
        <td>IP Address</td>
        <td>Port</td>
        <td>Version</td>
        <td>Default Tx Fee</td>
        <td>Trust</td>
        <td>Network Trust Avg</td>
      </tr>
    ));
  };

  return (
    <table className="PageTable">
      <thead>
        <tr>
          <th>Network ID</th>
          <th>Account Number</th>
          <th>Protocol</th>
          <th>IP Address</th>
          <th>Port</th>
          <th>Version</th>
          <th>Default Tx Fee</th>
          <th>Trust</th>
          <th>Network Trust Avg</th>
        </tr>
      </thead>
      <tbody>{renderSampleRows()}</tbody>
    </table>
  );
};

export default PageTable;
