import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './ButtonLoader.scss';

interface ComponentProps {
  className?: string;
}

const ButtonLoader: FC<ComponentProps> = ({className}) => {
  return <Icon className={clsx('ButtonLoader', className)} icon={IconType.loading} size={15.35} />;
};

export default memo(ButtonLoader);
