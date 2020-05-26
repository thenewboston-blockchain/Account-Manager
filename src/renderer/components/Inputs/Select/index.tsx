import React, {useMemo, useRef} from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select, {SelectProps as MuiSelectProps} from '@material-ui/core/Select';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

import {SelectMenuItem} from '@renderer/types/inputs';

import './Select.scss';

interface SelectProps extends MuiSelectProps {
  errorMessage: string;
  fullWidth?: boolean;
  initialLabelWidth?: number;
  label: string;
  options: SelectMenuItem[];
}

export default function ({errorMessage, fullWidth, initialLabelWidth, label, options, ...props}: SelectProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const labelWidth = labelRef.current ? labelRef.current.clientWidth + 3 : 0;
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
      <FormControl className="Select" fullWidth={fullWidth} variant="outlined">
        <InputLabel ref={labelRef}>{label}</InputLabel>
        <Select labelWidth={labelWidth || initialLabelWidth} {...props}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
}
