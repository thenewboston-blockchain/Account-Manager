import React, {CSSProperties, FC, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';
import {GenericVoidFunction} from '@renderer/types';
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

  const handleClick = useCallback(
    (e): void => {
      if (!dropdownRoot.contains(e.target) && !iconRef.current?.contains(e.target)) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  const handleOpenDropdown = (): void => {
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

  const handleOptionKeyPress = (optionOnClick: GenericVoidFunction) => async (
    e: KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
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
            {options.map(({disabled = false, label, onClick: optionOnClick}, i) => {
              return (
                <div
                  className={clsx('DropdownMenuButton__option', {
                    'DropdownMenuButton__option--disabled': disabled,
                    ...getCustomClassNames(className, '__option--disabled', disabled),
                  })}
                  key={JSON.stringify(label)}
                  onKeyPress={disabled ? noop : handleOptionKeyPress(optionOnClick)}
                  onClick={disabled ? noop : handleOptionClick(optionOnClick)}
                  role="button"
                  tabIndex={i}
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
