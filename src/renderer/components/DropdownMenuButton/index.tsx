import React, {CSSProperties, FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {GenericVoidFunction} from '@renderer/types/generic';

import './DropdownMenuButton.scss';

export interface DropdownMenuOption {
  disabled?: boolean;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

interface ComponentProps {
  options: DropdownMenuOption[];
}

const dropdownRoot = document.getElementById('dropdown-root')!;

const DropdownMenuButton: FC<ComponentProps> = ({options}) => {
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
      <Icon className="DropdownMenuButton" icon={IconType.dotsVertical} onClick={handleOpenDropdown} ref={iconRef} />
      {open &&
        createPortal(
          <div className="DropdownMenuButton__menu" style={dropdownPositionStyle}>
            {options.map(({disabled, label, onClick: optionOnClick}, i) => {
              return (
                <div
                  className={clsx('DropdownMenuButton__option', {disabled})}
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
