import React, {useMemo} from 'react';
import TextField, {BaseTextFieldProps} from '@material-ui/core/TextField';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

import './TextField.scss';

export default function (props: BaseTextFieldProps) {
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
      <TextField className="TextField" variant="outlined" {...props} />
    </ThemeProvider>
  );
}
