import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {Form, FormButton, FormButtonProps} from '@renderer/components/FormComponents';
import Icon, {IconType} from '@renderer/components/Icon';
import Loader from '@renderer/components/FormElements/Loader';

import {GenericFormValues} from '@renderer/types/forms';
import {GenericFunction} from '@renderer/types/generic';

import './Modal.scss';

export interface ModalButtonProps extends FormButtonProps {
  content: ReactNode;
}

interface ModalProps {
  cancelButton?: ModalButtonProps | string;
  className?: string;
  close(): void;
  displayCancelButton?: boolean;
  displaySubmitButton?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  ignoreDirty?: boolean;
  initialValues?: GenericFormValues;
  onSubmit: GenericFunction;
  style?: CSSProperties;
  submitButton?: ModalButtonProps | string;
  submitting?: boolean;
  validationSchema?: any;
}

const Modal: FC<ModalProps> = ({
  cancelButton,
  children,
  className,
  close,
  displayCancelButton = true,
  displaySubmitButton = true,
  footer,
  header,
  ignoreDirty: ignoreDirtyProps = false,
  initialValues = {},
  onSubmit,
  style,
  submitButton,
  submitting = false,
  validationSchema,
}) => {
  const ignoreDirty = useMemo<boolean>(() => ignoreDirtyProps || Object.keys(initialValues).length === 0, [
    ignoreDirtyProps,
    initialValues,
  ]);

  const cancelProps = useMemo<ModalButtonProps>(() => {
    if (typeof cancelButton === 'string') {
      return {
        content: cancelButton,
        ignoreDirty,
        onClick: close,
        submitting,
        variant: 'link',
      };
    }
    return {
      className: cancelButton?.className ?? undefined,
      color: cancelButton?.color ?? undefined,
      content: cancelButton?.content ?? 'Cancel',
      disabled: cancelButton?.disabled ?? undefined,
      ignoreDirty: cancelButton?.ignoreDirty ?? ignoreDirty,
      onClick: cancelButton?.onClick ?? close,
      submitting: cancelButton?.submitting ?? submitting,
      type: cancelButton?.type ?? undefined,
      variant: cancelButton?.variant ?? 'link',
    };
  }, [cancelButton, close, ignoreDirty, submitting]);

  const submitProps = useMemo<ModalButtonProps>(() => {
    if (typeof submitButton === 'string') {
      return {
        content: submitButton,
        ignoreDirty,
        submitting,
        type: 'submit',
      };
    }
    return {
      className: submitButton?.className ?? undefined,
      color: submitButton?.color ?? undefined,
      content: submitButton?.content ?? 'Submit',
      disabled: submitButton?.disabled ?? undefined,
      ignoreDirty: submitButton?.ignoreDirty ?? ignoreDirty,
      onClick: submitButton?.onClick ?? undefined,
      submitting: submitButton?.submitting ?? submitting,
      type: submitButton?.type ?? 'submit',
      variant: submitButton?.variant ?? undefined,
    };
  }, [ignoreDirty, submitButton, submitting]);

  const renderDefaultFooter = (): ReactNode => {
    return (
      <>
        {displayCancelButton && (
          <FormButton
            className={clsx('Modal__default-cancel', cancelProps.className)}
            color={cancelProps.color}
            disabled={cancelProps.disabled}
            ignoreDirty={cancelProps.ignoreDirty}
            onClick={cancelProps.onClick}
            submitting={cancelProps.submitting}
            type={cancelProps.type}
            variant={cancelProps.variant}
          >
            {cancelProps.content}
          </FormButton>
        )}
        {displaySubmitButton && (
          <FormButton
            className={clsx('Modal__default-submit', submitProps.className)}
            color={submitProps.color}
            disabled={submitProps.disabled}
            ignoreDirty={submitProps.ignoreDirty}
            onClick={submitProps.onClick}
            submitting={submitProps.submitting}
            type={submitProps.type}
            variant={submitProps.variant}
          >
            {submitting ? <Loader /> : submitProps.content}
          </FormButton>
        )}
      </>
    );
  };

  return createPortal(
    <>
      <div className={clsx('Modal__overlay', {submitting})} onClick={submitting ? noop : close} />
      <div className={clsx('Modal', {'Modal__default-position': !style}, className)} style={style}>
        <div className="Modal__header">
          {typeof header === 'string' ? <h2>{header}</h2> : header}
          <Icon
            className={clsx('Icon__close', {submitting})}
            disabled={submitting}
            icon={IconType.close}
            onClick={close}
          />
        </div>
        <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <div className="Modal__content">{children}</div>
          <div className="Modal__footer">{footer || renderDefaultFooter()}</div>
        </Form>
      </div>
    </>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
