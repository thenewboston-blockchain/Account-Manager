/* eslint-disable react/jsx-props-no-spreading */

import React, {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import clsx from 'clsx';

import AlertIcon from 'mdi-react/AlertIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import BellIcon from 'mdi-react/BellIcon';
import CheckboxBlankCircleIcon from 'mdi-react/CheckboxBlankCircleIcon';
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import EarthIcon from 'mdi-react/EarthIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PowerIcon from 'mdi-react/PowerIcon';
import PlayIcon from 'mdi-react/PlayIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import RadioboxBlankIcon from 'mdi-react/RadioboxBlankIcon';
import RadioboxMarkedIcon from 'mdi-react/RadioboxMarkedIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import ThumbsUpIcon from 'mdi-react/ThumbsUpIcon';

import {getCustomClassNames} from '@renderer/utils/components';
import TnbIcon from './TnbIcon';
import './Icon.scss';

// These names are camelCased versions of the names found in https://materialdesignicons.com/
export enum IconType {
  alert,
  alertCircleOutline,
  arrowLeft,
  arrowRight,
  bell,
  checkboxBlankCircle,
  checkboxBlankCircleOutline,
  chevronLeft,
  chevronRight,
  close,
  dotsVertical,
  earth,
  loading,
  pencil,
  play,
  plus,
  power,
  radioboxBlank,
  radioboxMarked,
  refresh,
  thumbsUp,
  tnb,
}

interface ComponentProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number | string;
  unfocusable?: boolean;
}

const Icon = forwardRef<HTMLDivElement, ComponentProps>(
  ({className, disabled = false, icon, onClick, onKeyDown, size = 24, unfocusable = false}, ref) => {
    const iconProps = useMemo(
      () => ({
        size,
      }),
      [size],
    );

    const getTabIndex = () => {
      if (unfocusable) return undefined;

      return onClick ? 0 : undefined;
    };

    const handleClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (disabled || !onClick) return;

      onClick(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!onClick) return;

      if (e.key === 'Enter' && !disabled) {
        handleClick();
      }

      onKeyDown?.(e);
    };

    const renderIcon = useCallback((): ReactNode => {
      switch (icon) {
        case IconType.alert:
          return <AlertIcon {...iconProps} />;
        case IconType.alertCircleOutline:
          return <AlertCircleOutlineIcon {...iconProps} />;
        case IconType.arrowLeft:
          return <ArrowLeftIcon {...iconProps} />;
        case IconType.arrowRight:
          return <ArrowRightIcon {...iconProps} />;
        case IconType.bell:
          return <BellIcon {...iconProps} />;
        case IconType.checkboxBlankCircle:
          return <CheckboxBlankCircleIcon {...iconProps} />;
        case IconType.checkboxBlankCircleOutline:
          return <CheckboxBlankCircleOutlineIcon {...iconProps} />;
        case IconType.chevronLeft:
          return <ChevronLeftIcon {...iconProps} />;
        case IconType.chevronRight:
          return <ChevronRightIcon {...iconProps} />;
        case IconType.close:
          return <CloseIcon {...iconProps} />;
        case IconType.dotsVertical:
          return <DotsVerticalIcon {...iconProps} />;
        case IconType.earth:
          return <EarthIcon {...iconProps} />;
        case IconType.loading:
          return <LoadingIcon {...iconProps} />;
        case IconType.pencil:
          return <PencilIcon {...iconProps} />;
        case IconType.play:
          return <PlayIcon {...iconProps} />;
        case IconType.plus:
          return <PlusIcon {...iconProps} />;
        case IconType.power:
          return <PowerIcon {...iconProps} />;
        case IconType.radioboxBlank:
          return <RadioboxBlankIcon {...iconProps} />;
        case IconType.radioboxMarked:
          return <RadioboxMarkedIcon {...iconProps} />;
        case IconType.refresh:
          return <RefreshIcon {...iconProps} />;
        case IconType.thumbsUp:
          return <ThumbsUpIcon {...iconProps} />;
        case IconType.tnb:
          return <TnbIcon {...iconProps} />;
        default:
          return null;
      }
    }, [icon, iconProps]);

    return (
      <div
        className={clsx('Icon', className, {
          'Icon--button': !!onClick,
          'Icon--disabled': disabled,
          ...getCustomClassNames(className, '--disabled', disabled),
        })}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={getTabIndex()}
      >
        {renderIcon()}
      </div>
    );
  },
);

export default Icon;
