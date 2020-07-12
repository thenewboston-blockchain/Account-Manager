import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './ExpandableTableRow.scss';

interface ComponentProps {
  children: ReactNode[];
}

const ExpandableTableRow: FC<ComponentProps> = ({children}) => {
  const [expanded, toggleExpanded] = useBooleanState(false);

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
