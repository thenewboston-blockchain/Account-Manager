import React, {FC, memo} from 'react';

import './RequiredAsterisk.scss';

const RequiredAsterisk: FC = () => {
  return <span className="RequiredAsterisk">*</span>;
};

export default memo(RequiredAsterisk);
