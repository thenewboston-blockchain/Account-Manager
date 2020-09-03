/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';

import './SuccessToast.scss';

interface ComponentProps {
  message: string;
}

const SuccessToast: FC<ComponentProps> = ({message}) => {
  return (
    <div className="SuccessToast">
      <Icon className="ThumbsUp" icon={IconType.thumbsUp} size={16} />
      <p>{message}</p>
    </div>
  );
};

export default SuccessToast;
