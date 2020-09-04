import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';

import './SuccessToast.scss';

interface ComponentProps {
  message: string;
}

const SuccessToast: FC<ComponentProps> = ({message}) => {
  return (
    <div className="SuccessToast">
      <Icon className="SuccessToast__icon" icon={IconType.thumbsUp} size={20} />
      <p className="SuccessToast__text">{message}</p>
    </div>
  );
};

export default SuccessToast;
