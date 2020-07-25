/* eslint-disable react/jsx-props-no-spreading */

import React, {forwardRef, ReactNode} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import AlertIcon from 'mdi-react/AlertIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import BellIcon from 'mdi-react/BellIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CogIcon from 'mdi-react/CogIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';
import PlayIcon from 'mdi-react/PlayIcon';
import PlusIcon from 'mdi-react/PlusIcon';

import {getCustomClassNames} from '@renderer/utils/components';
import TnbIcon from './TnbIcon';
import './Icon.scss';

// These names are camelCased versions of the names found in https://materialdesignicons.com/
export enum IconType {
  alert,
  arrowLeft,
  arrowRight,
  bell,
  close,
  cog,
  dotsVertical,
  helpCircle,
  play,
  plus,
  tnb,
}

interface ComponentProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?(e: React.MouseEvent<SVGSVGElement, MouseEvent>): void;
  size?: number | string;
}

const Icon = forwardRef<HTMLDivElement, ComponentProps>(({className, disabled = false, icon, onClick, size}, ref) => {
  const iconProps = {
    onClick: disabled ? noop : onClick,
    size,
  };

  const renderIcon = (): ReactNode => {
    switch (icon) {
      case IconType.alert:
        return <AlertIcon {...iconProps} />;
      case IconType.arrowLeft:
        return <ArrowLeftIcon {...iconProps} />;
      case IconType.arrowRight:
        return <ArrowRightIcon {...iconProps} />;
      case IconType.bell:
        return <BellIcon {...iconProps} />;
      case IconType.close:
        return <CloseIcon {...iconProps} />;
      case IconType.cog:
        return <CogIcon {...iconProps} />;
      case IconType.dotsVertical:
        return <DotsVerticalIcon {...iconProps} />;
      case IconType.helpCircle:
        return <HelpCircleIcon {...iconProps} />;
      case IconType.play:
        return <PlayIcon {...iconProps} />;
      case IconType.plus:
        return <PlusIcon {...iconProps} />;
      case IconType.tnb:
        return <TnbIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx('Icon', className, {
        'Icon--disabled': disabled,
        ...getCustomClassNames(className, '--disabled', disabled),
      })}
      ref={ref}
    >
      {renderIcon()}
    </div>
  );
});

export default Icon;
