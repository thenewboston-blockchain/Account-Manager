import React, {CSSProperties, FC, KeyboardEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState, useEventListener} from '@renderer/hooks';
import {GenericVoidFunction} from '@renderer/types';
import {getCustomClassNames} from '@renderer/utils/components';

import './DropdownMenuButton.scss';

export enum DropdownMenuDirection {
  left,
  right,
}

export interface DropdownMenuOption {
  disabled?: boolean;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

interface ComponentProps {
  className?: string;
  direction?: DropdownMenuDirection;
  options: DropdownMenuOption[];
}

const dropdownRoot = document.getElementById('dropdown-root')!;

const DropdownMenuButton: FC<ComponentProps> = ({className, direction = DropdownMenuDirection.right, options}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const [dropdownPositionStyle, setDropdownPositionStyle] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (open) {
      optionsRef.current[0]?.focus();
    }
  }, [open, optionsRef]);

  const handleClick = (e: any): void => {
    if (!dropdownRoot.contains(e.target) && !iconRef.current?.contains(e.target)) {
      closeMenu();
    }
  };

  useEventListener('mousedown', handleClick, document);

  const handleOpenDropdown = (): void => {
    if (iconRef.current) {
      const {bottom, left, width} = iconRef.current.getBoundingClientRect();

      if (direction === DropdownMenuDirection.left) {
        setDropdownPositionStyle({right: window.innerWidth - left - width / 2, top: bottom + 3});
      } else if (direction === DropdownMenuDirection.right) {
        setDropdownPositionStyle({left: left + width / 2, top: bottom + 3});
      }

      toggleOpen();
    }
  };

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    closeMenu();
  };

  const handleOptionKeyDown = (optionOnClick: GenericVoidFunction, index: number) => async (
    e: KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    if (index !== options.length - 1 && e.key === 'ArrowDown') {
      optionsRef.current[index + 1]?.focus();
      return;
    }
    if (index !== 0 && e.key === 'ArrowUp') {
      optionsRef.current[index - 1]?.focus();
      return;
    }
    if (e.key === 'Enter') {
      await optionOnClick();
      closeMenu();
    }
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
            {options.map(({disabled = false, label, onClick: optionOnClick}, index) => {
              return (
                <div
                  className={clsx('DropdownMenuButton__option', {
                    'DropdownMenuButton__option--disabled': disabled,
                    ...getCustomClassNames(className, '__option--disabled', disabled),
                  })}
                  key={JSON.stringify(label)}
                  onKeyDown={disabled ? noop : handleOptionKeyDown(optionOnClick, index)}
                  onClick={disabled ? noop : handleOptionClick(optionOnClick)}
                  ref={(el) => {
                    if (el) {
                      optionsRef.current[index] = el;
                    }
                  }}
                  role="button"
                  tabIndex={0}
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
