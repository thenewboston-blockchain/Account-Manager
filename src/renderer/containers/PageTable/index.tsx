import React, {FC} from 'react';

import ExpandableTableRow from '@renderer/components/ExpandableTableRow';

import './PageTable.scss';

interface Header {
  [key: string]: string;
}

interface Data {
  id: string;
  [key: string]: string | number;
}

interface Item {
  header: Header;
  data: Data[];
}

interface ComponentProps {
  items: Item;
}

const PageTable: FC<ComponentProps> = ({items}) => {
  const {header, data} = items;

  const renderSampleRows = () =>
    data.map((item) => (
      <ExpandableTableRow key={item.id}>
        {Object.keys(header).map((key) => (
          <td key={key}>{item[key]}</td>
        ))}
      </ExpandableTableRow>
    ));

  return (
    <table className="PageTable">
      <thead>
        <tr>
          <th />
          {Object.entries(header).map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      </thead>
      <tbody>{renderSampleRows()}</tbody>
    </table>
  );
};

export default PageTable;
