/* eslint-disable react/jsx-props-no-spreading */

import React, {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import clsx from 'clsx';

import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import AlertIcon from 'mdi-react/AlertIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import BellIcon from 'mdi-react/BellIcon';
import CheckboxBlankCircleIcon from 'mdi-react/CheckboxBlankCircleIcon';
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import EyeOffIcon from 'mdi-react/EyeOffIcon';
import LanConnectIcon from 'mdi-react/LanConnectIcon';
import LanDisconnectIcon from 'mdi-react/LanDisconnectIcon';
import LinkIcon from 'mdi-react/LinkIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PlayIcon from 'mdi-react/PlayIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import PowerIcon from 'mdi-react/PowerIcon';
import RadioboxBlankIcon from 'mdi-react/RadioboxBlankIcon';
import RadioboxMarkedIcon from 'mdi-react/RadioboxMarkedIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import SyncIcon from 'mdi-react/SyncIcon';
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
  contentCopy,
  dotsVertical,
  download,
  eye,
  eyeOff,
  lanConnect,
  lanDisconnect,
  link,
  loading,
  pencil,
  play,
  plus,
  power,
  radioboxBlank,
  radioboxMarked,
  refresh,
  sync,
  thumbsUp,
  tnb,
}

interface ComponentProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number;
  totalSize?: number | 'unset';
  unfocusable?: boolean;
}

const Icon = forwardRef<HTMLDivElement, ComponentProps>(
  ({className, disabled = false, icon, onClick, onKeyDown, size, totalSize = 30, unfocusable = false}, ref) => {
    const divStyle = useMemo(() => {
      if (totalSize === 'unset') return {};
      const divSize = Math.max(size || 0, totalSize);
      return {height: divSize, width: divSize};
    }, [size, totalSize]);

    const tabIndex = useMemo(() => (unfocusable || !onClick ? undefined : 0), [onClick, unfocusable]);

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
          return <AlertIcon size={size || 24} />;
        case IconType.alertCircleOutline:
          return <AlertCircleOutlineIcon size={size || 24} />;
        case IconType.arrowLeft:
          return <ArrowLeftIcon size={size || 24} />;
        case IconType.arrowRight:
          return <ArrowRightIcon size={size || 24} />;
        case IconType.bell:
          return <BellIcon size={size || 22} />;
        case IconType.checkboxBlankCircle:
          return <CheckboxBlankCircleIcon size={size || 24} />;
        case IconType.checkboxBlankCircleOutline:
          return <CheckboxBlankCircleOutlineIcon size={size || 24} />;
        case IconType.chevronLeft:
          return <ChevronLeftIcon size={size || 24} />;
        case IconType.chevronRight:
          return <ChevronRightIcon size={size || 24} />;
        case IconType.close:
          return <CloseIcon size={size || 24} />;
        case IconType.contentCopy:
          return <ContentCopyIcon size={size || 22} />;
        case IconType.dotsVertical:
          return <DotsVerticalIcon size={size || 24} />;
        case IconType.download:
          return <DownloadIcon size={size || 24} />;
        case IconType.eye:
          return <EyeIcon size={size || 22} />;
        case IconType.eyeOff:
          return <EyeOffIcon size={size || 22} />;
        case IconType.lanConnect:
          return <LanConnectIcon size={size || 24} />;
        case IconType.lanDisconnect:
          return <LanDisconnectIcon size={size || 24} />;
        case IconType.link:
          return <LinkIcon size={size || 24} />;
        case IconType.loading:
          return <LoadingIcon size={size || 24} />;
        case IconType.pencil:
          return <PencilIcon size={size || 24} />;
        case IconType.play:
          return <PlayIcon size={size || 24} />;
        case IconType.plus:
          return <PlusIcon size={size || 24} />;
        case IconType.power:
          return <PowerIcon size={size || 24} />;
        case IconType.radioboxBlank:
          return <RadioboxBlankIcon size={size || 24} />;
        case IconType.radioboxMarked:
          return <RadioboxMarkedIcon size={size || 24} />;
        case IconType.refresh:
          return <RefreshIcon size={size || 24} />;
        case IconType.sync:
          return <SyncIcon size={size || 24} />;
        case IconType.thumbsUp:
          return <ThumbsUpIcon size={size || 20} />;
        case IconType.tnb:
          return <TnbIcon size={size || 24} />;
        default:
          return null;
      }
    }, [icon, size]);

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
        style={divStyle}
        tabIndex={tabIndex}
      >
        {renderIcon()}
      </div>
    );
  },
);

export default Icon;
