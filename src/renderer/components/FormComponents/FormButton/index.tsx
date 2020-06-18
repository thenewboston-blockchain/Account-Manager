import React, {FC} from 'react';
import {useFormikContext} from 'formik';
import {Button, ButtonProps} from '@renderer/components/FormElements';

interface ComponentProps extends Omit<ButtonProps, 'onClick'> {
  submitting?: boolean;
}

const FormButton: FC<ComponentProps> = ({
  className,
  children,
  color,
  disabled = false,
  submitting = false,
  type = 'submit',
  variant,
}) => {
  const {dirty, handleReset, handleSubmit, isValid} = useFormikContext();

  const buttonIsDisabled = disabled || !dirty || submitting || (type === 'submit' ? !isValid : false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === 'submit') handleSubmit();

    if (type === 'reset') handleReset();
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
