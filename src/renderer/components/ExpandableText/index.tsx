import React, {FC, useMemo} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

interface ComponentProps {
  className?: string;
  expanded: boolean;
  text: string;
}

const VISIBLE_COUNT = 7;

const ExpandableText: FC<ComponentProps> = ({className, expanded, text}) => {
  const renderedText = useMemo<string>(() => {
    if (expanded || text.length <= VISIBLE_COUNT * 2 + 1) {
      return text;
    }

    return `${text.slice(0, VISIBLE_COUNT)}...${text.slice(text.length - 1 - VISIBLE_COUNT)}`;
  }, [expanded, text]);

  return (
    <span
      className={clsx('ExpandableText', className, {
        'ExpandableText--expanded': expanded,
        ...bemify(className, '--expanded', expanded),
      })}
    >
      {renderedText}
    </span>
  );
};

export default ExpandableText;
