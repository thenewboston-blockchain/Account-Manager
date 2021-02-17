/* eslint-disable react/jsx-props-no-spreading */

import React, {FC, useMemo} from 'react';
import {useFormikContext} from 'formik';
import {Button, ButtonProps, ButtonType} from '@thenewboston/ui';
import {Loader} from '@renderer/components/FormElements';

export interface FormButtonProps extends ButtonProps {
  ignoreDirty?: boolean;
  submitting?: boolean;
}

const FormButton: FC<FormButtonProps> = ({children, ignoreDirty = false, submitting = false, ...baseButtonProps}) => {
  const {disabled = false, onClick, type = ButtonType.button} = baseButtonProps;
  const {dirty, handleReset, handleSubmit, isValid} = useFormikContext();

  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case ButtonType.submit:
        return disabled || (!ignoreDirty && !dirty) || !isValid || submitting;
      case ButtonType.reset:
        return disabled || (!ignoreDirty && !dirty) || submitting;
      default:
        return disabled || submitting;
    }
  }, [disabled, dirty, ignoreDirty, isValid, submitting, type]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === ButtonType.submit) handleSubmit();

    if (type === ButtonType.reset) handleReset();

    if (type === ButtonType.button) onClick?.(e);
  };

  return (
    <Button {...baseButtonProps} disabled={buttonIsDisabled} onClick={handleClick}>
      {type === ButtonType.submit && submitting ? <Loader /> : children}
    </Button>
  );
};

export default FormButton;
