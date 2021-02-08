import React, {CSSProperties, FC, KeyboardEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import {useBooleanState, useEventListener} from '@renderer/hooks';
import {GenericVoidFunction} from '@renderer/types';

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
  icon?: IconType;
  options: DropdownMenuOption[];
}

const dropdownRoot = document.getElementById('dropdown-root')!;

const DropdownMenuButton: FC<ComponentProps> = ({
  className,
  direction = DropdownMenuDirection.right,
  icon = IconType.dotsVertical,
  options,
}) => {
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

  const handleOptionKeyDown = (optionOnClick: GenericVoidFunction, index: number, disabled: boolean) => async (
    e: KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    if (e.key === 'ArrowDown' && index !== options.length - 1) {
      optionsRef.current[index + 1]?.focus();
      return;
    }

    if (e.key === 'ArrowUp' && index !== 0) {
      optionsRef.current[index - 1]?.focus();
      return;
    }

    if (e.key === 'Enter' && !disabled) {
      closeMenu();
      await optionOnClick();
    }
  };

  return (
    <>
      <Icon
        className={clsx('DropdownMenuButton', className, {
          'DropdownMenuButton--active': open,
          ...bemify(className, '--active', open),
        })}
        icon={icon}
        onClick={handleOpenDropdown}
        ref={iconRef}
      />
      {open &&
        createPortal(
          <div
            className={clsx('DropdownMenuButton__menu', {...bemify(className, '__menu')})}
            style={dropdownPositionStyle}
          >
            {options.map(({disabled = false, label, onClick: optionOnClick}, index) => {
              return (
                <div
                  className={clsx('DropdownMenuButton__option', {
                    'DropdownMenuButton__option--disabled': disabled,
                    ...bemify(className, '__option--disabled', disabled),
                  })}
                  key={JSON.stringify(label)}
                  onKeyDown={handleOptionKeyDown(optionOnClick, index, disabled)}
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
