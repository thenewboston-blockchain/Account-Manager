import {ChevronIcon} from '@renderer/containers/Account/SendPointsModal/icons';
import React from 'react';
import clsx from 'clsx';

import IconLoader from '../IconLoader';
import ArrowSvg from '@renderer/assets/arrow.svg';
import ChevronSvg from '@renderer/assets/chevron.svg';
import PlayArrowSvg from '@renderer/assets/playArrow.svg';
import PlusSvg from '@renderer/assets/plus.svg';
import VerticalDotsSvg from '@renderer/assets/verticalDots.svg';
import WarningSvg from '@renderer/assets/warning.svg';
import ChevronSvg from '@renderer/assets/chevron.svg';
import './index.scss';

const ArrowIcon = (props) => <IconLoader src={ArrowSvg} {...props} />;
const ChevronIcon = (props) => <IconLoader src={ChevronSvg} {...props} />;
const ArrowForwardIcon = (props) => <ArrowIcon {...props} className={clsx('rotate-180', props.className || '')} />;
const PlayArrowIcon = (props) => <IconLoader src={PlayArrowSvg} {...props} />;
const PlusIcon = (props) => <IconLoader src={PlusSvg} {...props} />;
const VerticalDotsIcon = React.forwardRef((props, ref) => <IconLoader src={VerticalDotsSvg} {...props} ref={ref} />);
const WarningIcon = (props) => <IconLoader src={WarningSvg} {...props} />;
const ChevronIcon = (props) => <IconLoader src={ChevronSvg} {...props} />;

export const ICON_MAPPING = {
  arrow: ArrowIcon,
  chevron: ChevronIcon,
  'arrow-forward': ArrowForwardIcon,
  'play-arrow': PlayArrowIcon,
  add: PlusIcon,
  'more-vert': VerticalDotsIcon,
  warning: WarningIcon,
  chevron: ChevronIcon,
};
