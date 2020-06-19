import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon from '@renderer/components/Icon';
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

const DropdownMenuButton: FC<ComponentProps> = ({options}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open]);

  const handleClick = useCallback(
    (e: MouseEvent): void => {
      if (!componentRef.current?.contains(e.target as any)) {
        closeMenu();
      }
    },
    [open],
  );

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    closeMenu();
  };

  return (
    <div className="DropdownMenuButton" ref={componentRef}>
      <Icon icon="more_vert" onClick={toggleOpen} />
      {open && (
        <div className="DropdownMenuButton__menu">
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
        </div>
      )}
    </div>
  );
};

export default DropdownMenuButton;
