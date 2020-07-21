import React, {CSSProperties, FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {GenericVoidFunction} from '@renderer/types/generic';
import {getCustomClassNames} from '@renderer/utils/components';

import './DropdownMenuButton.scss';

export interface DropdownMenuOption {
  disabled?: boolean;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

interface ComponentProps {
  className?: string;
  options: DropdownMenuOption[];
}

const dropdownRoot = document.getElementById('dropdown-root')!;

const DropdownMenuButton: FC<ComponentProps> = ({className, options}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const [dropdownPositionStyle, setDropdownPositionStyle] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open]);

  const handleClick = useCallback(
    (e: any): void => {
      if (!dropdownRoot.contains(e.target) && !iconRef.current?.contains(e.target)) {
        closeMenu();
      }
    },
    [open],
  );

  const handleOpenDropdown = () => {
    if (iconRef.current) {
      const {left, bottom, width} = iconRef.current.getBoundingClientRect();
      setDropdownPositionStyle({left: left + width / 2, top: bottom + 3});
      toggleOpen();
    }
  };

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    closeMenu();
  };

  return (
    <>
      <Icon
        className={clsx('DropdownMenuButton', className, {
          'DropdownMenuButton--active': open,
          ...getCustomClassNames(className, '--active', open),
        })}
        icon={IconType.dotsVertical}
        onClick={handleOpenDropdown}
        ref={iconRef}
      />
      {open &&
        createPortal(
          <div
            className={clsx('DropdownMenuButton__menu', {...getCustomClassNames(className, '__menu', true)})}
            style={dropdownPositionStyle}
          >
            {options.map(({disabled = false, label, onClick: optionOnClick}, i) => {
              return (
                <div
                  className={clsx('DropdownMenuButton__option', {
                    'DropdownMenuButton__option--disabled': disabled,
                    ...getCustomClassNames(className, '__option--disabled', disabled),
                  })}
                  key={i}
                  onClick={disabled ? noop : handleOptionClick(optionOnClick)}
                >
                  {label}
                </div>
              );
            })}
          </div>,
          dropdownRoot,
        )}
    </>
  );
};

export default DropdownMenuButton;
