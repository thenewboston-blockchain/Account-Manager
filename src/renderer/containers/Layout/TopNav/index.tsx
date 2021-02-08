import React, {FC, ReactNode, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ipcRenderer} from 'electron';
import {Icon, IconType} from '@thenewboston/ui';

import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import Modal from '@renderer/components/Modal';
import ChangeActiveBankModal from '@renderer/containers/Bank/ChangeActiveBankModal';
import Notifications from '@renderer/containers/Notifications';
import {clearLocalState} from '@renderer/dispatchers/app';
import {useBooleanState, useIpcEffect, useNavigationalHistory, useReadIpc, useWriteIpc} from '@renderer/hooks';
import {getPrimaryValidatorConfig} from '@renderer/selectors';
import localStore from '@renderer/store/local';
import {AppDispatch, LocalStore} from '@renderer/types';
import {displayToast} from '@renderer/utils/toast';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';

import './TopNav.scss';

const exportSuccessToast = () => {
  displayToast('Store Data has successfully been exported', 'success');
};

const exportFailToast = (event: any, errorMessage: string) => {
  displayToast(`Could not export Store Data: ${errorMessage}`);
};

const importFailToast = (event: any, errorMessage: string) => {
  displayToast(`Could not import Store Data: ${errorMessage}`);
};

const restartAppSuccessToast = () => {
  displayToast('Successfully Imported Data', 'success');
};

const restartAppFailToast = (event: any, errorMessage: string) => {
  displayToast(`There was a problem restarting the app: ${errorMessage}`);
};

const TopNav: FC = () => {
  const [changeActiveBankModalIsOpen, toggleActiveBankModal] = useBooleanState(false);
  const [resetAppModalIsOpen, toggleResetAppModal] = useBooleanState(false);
  const [importStoreDataModalIsOpen, toggleImportStoreDataModal, , closeImportStoreDataModal] = useBooleanState(false);
  const dispatch = useDispatch<AppDispatch>();
  useIpcEffect(getSuccessChannel(IpcChannel.restartApp), restartAppSuccessToast);
  useIpcEffect(getFailChannel(IpcChannel.restartApp), restartAppFailToast);
  const {back, backEnabled, forward, forwardEnabled, reload} = useNavigationalHistory();
  const primaryValidatorConfig = useSelector(getPrimaryValidatorConfig);

  const handleImportSuccessCallback = useCallback((event: any, storeData: LocalStore) => {
    localStore.clear();
    localStore.set(storeData);
    ipcRenderer.send(IpcChannel.restartApp);
  }, []);

  const handleExportClick = useWriteIpc({
    channel: IpcChannel.exportStoreData,
    downloadOptions: {buttonLabel: 'Export', defaultPath: 'store-data.json', title: 'Export Store Data'},
    extension: 'json',
    failCallback: exportFailToast,
    payload: JSON.stringify(localStore.store),
    successCallback: exportSuccessToast,
  });

  const handleImportIpc = useReadIpc({
    channel: IpcChannel.importStoreData,
    downloadOptions: {buttonLabel: 'Import', title: 'Import Store Data'},
    failCallback: importFailToast,
    postSendCallback: closeImportStoreDataModal,
    successCallback: handleImportSuccessCallback,
  });

  const devDropdownMenuItems = useMemo<DropdownMenuOption[]>(() => {
    return [
      {label: 'Export Store Data', onClick: handleExportClick},
      {label: 'Import Store Data', onClick: toggleImportStoreDataModal},
      {label: 'Reset App', onClick: toggleResetAppModal},
    ];
  }, [handleExportClick, toggleImportStoreDataModal, toggleResetAppModal]);

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
    if (!primaryValidatorConfig) return null;
    return (
      <div className="TopNav__container">
        <span className="TopNav__change-bank" onClick={toggleActiveBankModal}>
          Change Active Bank
        </span>
        <DropdownMenuButton
          className="TopNav__icon TopNav__icon--dev"
          direction={DropdownMenuDirection.left}
          icon={IconType.devTo}
          options={devDropdownMenuItems}
        />
        <Notifications />
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
      {importStoreDataModalIsOpen && (
        <Modal
          close={toggleImportStoreDataModal}
          header="Import Store Data (Dev Only)"
          onSubmit={handleImportIpc}
          submitButton="Import"
        >
          Are you sure you want to import store data? This action is irreversible.
        </Modal>
      )}
    </div>
  );
};

export default TopNav;
