import React, {FC, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Icon, {IconType} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import ChangeActiveBankModal from '@renderer/containers/ChangeActiveBankModal';
import {clearLocalState} from '@renderer/dispatchers/app';
import {useBooleanState, useNavigationalHistory} from '@renderer/hooks';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';

import TopNavNotifications from './TopNavNotifications';
import './TopNav.scss';

const TopNav: FC = () => {
  const [changeActiveBankModalIsOpen, toggleActiveBankModal] = useBooleanState(false);
  const [resetAppModalIsOpen, toggleResetAppModal] = useBooleanState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {back, backEnabled, forward, forwardEnabled, reload} = useNavigationalHistory();
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

  const handleResetApp = () => {
    dispatch(clearLocalState());
  };

  const renderLeft = (): ReactNode => (
    <div className="TopNav__container">
      <Icon className="TopNav__icon" disabled={!backEnabled} icon={IconType.arrowLeft} onClick={back} />
      <Icon className="TopNav__icon" disabled={!forwardEnabled} icon={IconType.arrowRight} onClick={forward} />
      <Icon className="TopNav__icon" icon={IconType.refresh} onClick={reload} />
    </div>
  );

  const renderRight = (): ReactNode => {
    if (!activePrimaryValidator) return null;
    return (
      <div className="TopNav__container">
        <span className="TopNav__change-bank" onClick={toggleActiveBankModal}>
          Change Active Bank
        </span>
        <Icon className="TopNav__icon" icon={IconType.power} onClick={toggleResetAppModal} />
        <TopNavNotifications />
      </div>
    );
  };

  return (
    <div className="TopNav">
      {renderLeft()}
      {renderRight()}
      {changeActiveBankModalIsOpen && <ChangeActiveBankModal close={toggleActiveBankModal} />}
      {resetAppModalIsOpen && (
        <Modal close={toggleResetAppModal} header="Reset App (Dev Only)" onSubmit={handleResetApp} submitButton="Reset">
          Are you sure you want to reset the app?
        </Modal>
      )}
    </div>
  );
};

export default TopNav;
