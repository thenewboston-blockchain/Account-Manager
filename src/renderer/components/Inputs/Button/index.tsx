import React from 'react';
import clsx from 'clsx';

import Button, {ButtonProps as MuiButtonProps} from '@material-ui/core/Button';

import './Button.scss';

type ButtonProps = MuiButtonProps;

export default function ({children, className, ...props}: ButtonProps) {
  return (
    <Button className={clsx('Button', className)} variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
}
