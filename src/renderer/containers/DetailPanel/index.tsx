import React, {FC, ReactNode} from 'react';

import './DetailPanel.scss';

interface Item {
  attribute: string;
  value: string;
}

interface ComponentProps {
  items: Item[];
  tableHead?: ReactNode;
  title: string;
}

const DetailPanel: FC<ComponentProps> = ({items, tableHead, title}) => {
  const renderSampleRows = () => {
    return items.map(({attribute, value}, i) => (
      <tr key={i}>
        <td>{attribute}</td>
        <td>{value}</td>
      </tr>
    ));
  };

  return (
    <div className="DetailPanel">
      <h1 className="panel-title">{title}</h1>
      <table className="panel-table">
        {tableHead || null}
        <tbody>{renderSampleRows()}</tbody>
      </table>
    </div>
  );
};

export default DetailPanel;
