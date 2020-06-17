import React, {FC, ReactNode, useState} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';

import './ExpandableTableRow.scss';

interface ComponentProps {
  children: ReactNode[];
}

const ExpandableTableRow: FC<ComponentProps> = ({children}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = (): void => {
    setExpanded(!expanded);
  };

  return (
    <tr className={clsx('ExpandableTableRow', {expanded: expanded})}>
      <td>
        <ArrowToggle expanded={expanded} onClick={toggleExpanded} />
      </td>
      {children}
    </tr>
  );
};

export default ExpandableTableRow;
