import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './ExpandableTableRow.scss';

// TODO: Possibly don't need

interface ComponentProps {
  children: ReactNode[];
}

const ExpandableTableRow: FC<ComponentProps> = ({children}) => {
  const [expanded, toggleExpanded] = useBooleanState(false);

  return (
    <tr className={clsx('ExpandableTableRow', {'ExpandableTableRow--expanded': expanded})}>
      <td>
        <ArrowToggle className="ExpandableTableRow__ArrowToggle" expanded={expanded} onClick={toggleExpanded} />
      </td>
      {children}
    </tr>
  );
};

export default ExpandableTableRow;
