import React, {memo} from 'react';
import IconLoader from '@renderer/components/IconLoader';
import ChevronSvg from '@renderer/assets/chevron.svg';

export const ChevronIcon = (props) => <IconLoader {...props} src={ChevronSvg} />;
