import React, {FC, useMemo} from 'react';
import {useFormikContext} from 'formik';
import {Button, BaseButtonProps} from '@renderer/components/FormElements';

export interface FormButtonProps extends BaseButtonProps {
  ignoreDirty?: boolean;
  submitting?: boolean;
}

const FormButton: FC<FormButtonProps> = ({
  children,
  disabled = false,
  ignoreDirty = false,
  onClick,
  submitting = false,
  type = 'button',
  ...baseButtonProps
}) => {
  const {dirty, handleReset, handleSubmit, isValid} = useFormikContext();

  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case 'submit':
        return disabled || (!ignoreDirty && !dirty) || !isValid || submitting;
      case 'reset':
        return disabled || (!ignoreDirty && !dirty) || submitting;
      default:
        return disabled || submitting;
    }
  }, [disabled, dirty, isValid, submitting]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === 'submit') handleSubmit();

    if (type === 'reset') handleReset();

    if (type === 'button') onClick?.(e);
  };

  return (
    <Button disabled={buttonIsDisabled} onClick={handleClick} type={type} {...baseButtonProps}>
      {children}
    </Button>
  );
};

export default FormButton;
