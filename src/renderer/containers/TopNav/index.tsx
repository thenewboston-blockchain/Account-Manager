import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';

import Icon, {IconType} from '@renderer/components/Icon';
import ChangeActiveBankModal from '@renderer/containers/App/ChangeActiveBankModal';
import {useBooleanState, useNavigationalHistory} from '@renderer/hooks';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';

import './TopNav.scss';

const TopNav: FC = () => {
  const [changeActiveBankModalIsOpen, toggleActiveBankModal] = useBooleanState(false);
  const {goBack, goBackIsDisabled, goForward, goForwardIsDisabled} = useNavigationalHistory();
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

  const renderLeft = (): ReactNode => (
    <div className="TopNav__container">
      <Icon className="TopNav__icon" disabled={goBackIsDisabled} icon={IconType.arrowLeft} onClick={goBack} />
      <Icon className="TopNav__icon" disabled={goForwardIsDisabled} icon={IconType.arrowRight} onClick={goForward} />
    </div>
  );

  const renderRight = (): ReactNode => {
    if (!activePrimaryValidator) return null;
    return (
      <div className="TopNav__container">
        <span className="TopNav__change-bank" onClick={toggleActiveBankModal}>
          Change Active Bank
        </span>
        <Icon className="TopNav__icon" icon={IconType.bell} />
      </div>
    );
  };

  return (
    <div className="TopNav">
      {renderLeft()}
      {renderRight()}
      {changeActiveBankModalIsOpen && <ChangeActiveBankModal close={toggleActiveBankModal} />}
    </div>
  );
};

export default TopNav;
