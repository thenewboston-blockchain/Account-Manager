import React, {useMemo} from 'react';

import Button, {ButtonProps as MuiButtonProps} from '@material-ui/core/Button';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

type ButtonProps = MuiButtonProps;

export default function ({children, ...props}: ButtonProps) {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: lightBlue,
          type: 'dark',
        },
      }),
    [],
  );
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" {...props}>
        {children}
      </Button>
    </ThemeProvider>
  );
}
