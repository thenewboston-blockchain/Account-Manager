import React, {FC, useMemo} from 'react';
import {useFormikContext} from 'formik';
import {Button, ButtonProps} from '@renderer/components/FormElements';

interface ComponentProps extends ButtonProps {
  ignoreDirty?: boolean;
  submitting?: boolean;
}

const FormButton: FC<ComponentProps> = ({
  children,
  className,
  color,
  disabled = false,
  ignoreDirty = false,
  onClick,
  submitting = false,
  type = 'button',
  variant,
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
    <Button
      className={className}
      color={color}
      disabled={buttonIsDisabled}
      onClick={handleClick}
      type={type}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default FormButton;
