import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {Form, FormButton, FormButtonProps} from '@renderer/components/FormComponents';
import Icon from '@renderer/components/Icon';
import Loader from '@renderer/components/FormElements/Loader';

import {GenericFormValues} from '@renderer/types/forms';
import {GenericFunction} from '@renderer/types/generic';

import './Modal.scss';

export interface ModalButtonProps extends FormButtonProps {
  content: ReactNode;
}

// Usage Guide
// --
// use `header` or `title` prop to render the header
// use 'footer' or ( 'submitButtonContent' | 'cancelButtonContent' ) prop to render the footer
// --
interface ModalProps {
  cancelButton?: ModalButtonProps;
  className?: string;
  footer?: ReactNode;
  header?: ReactNode;
  hideCancelButton?: boolean;
  hideSubmitButton?: boolean;
  initialValues?: GenericFormValues;
  onSubmit: GenericFunction;
  open: boolean;
  close(): void;
  style?: CSSProperties;
  submitting?: boolean;
  submitButton?: ModalButtonProps;
  title?: string;
}

const defaultModalStyle: CSSProperties = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 324,
};

const Modal: FC<ModalProps> = ({
  cancelButton,
  children,
  className,
  close,
  footer,
  header,
  hideCancelButton = false,
  hideSubmitButton = false,
  initialValues = {},
  onSubmit,
  open,
  style = defaultModalStyle,
  submitting = false,
  submitButton,
  title,
}) => {
  const ignoreDirty = useMemo<boolean>(() => Object.keys(initialValues).length === 0, [initialValues]);
  const cancelProps = useMemo<ModalButtonProps>(
    () => ({
      className: cancelButton?.className ?? undefined,
      color: cancelButton?.color ?? undefined,
      content: cancelButton?.content ?? 'Cancel',
      disabled: cancelButton?.disabled ?? undefined,
      ignoreDirty: cancelButton?.ignoreDirty ?? ignoreDirty,
      onClick: cancelButton?.onClick ?? close,
      submitting: cancelButton?.submitting ?? submitting,
      type: cancelButton?.type ?? undefined,
      variant: cancelButton?.variant ?? 'link',
    }),
    [cancelButton, close, ignoreDirty, submitting],
  );
  const submitProps = useMemo<ModalButtonProps>(() => {
    return {
      className: submitButton?.className ?? undefined,
      color: submitButton?.color ?? undefined,
      content: submitButton?.content ?? 'Submit',
      disabled: cancelButton?.disabled ?? undefined,
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
        {!hideCancelButton && (
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
        {!hideSubmitButton && (
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

  return open
    ? createPortal(
        <>
          <div className={clsx('Modal__overlay', {submitting})} onClick={submitting ? noop : close} />
          <div className={clsx('Modal', className)} style={style}>
            <div className="Modal__header">
              {header || <h2>{title}</h2>}
              <Icon className={clsx('Icon__close', {submitting})} disabled={submitting} icon="close" onClick={close} />
            </div>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
              <div className="Modal__content">{children}</div>
              <div className="Modal__footer">{footer || renderDefaultFooter()}</div>
            </Form>
          </div>
        </>,
        document.getElementById('modal-root')!,
      )
    : null;
};

export default Modal;
