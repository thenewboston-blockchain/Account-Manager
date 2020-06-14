import React, {FC, ReactNode} from 'react';

import './DetailPanel.scss';

const sampleData = [
  {
    attribute: 'Node Type',
    value: 'Validator',
  },
  {
    attribute: 'Network ID',
    value: 'Gn53dfs4a2z',
  },
  {
    attribute: 'Protocol',
    value: 'http',
  },
];

interface Item {
  attribute: string;
  value: string;
}

interface ComponentProps {
  heading: string;
  items: Item[];
}

const DetailPanel: FC<ComponentProps> = ({heading, items}) => {
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
      <h1 className="panel-heading">{heading}</h1>
      <table className="panel-table">
        <tbody>{renderSampleRows()}</tbody>
      </table>
    </div>
  );
};

export default DetailPanel;
