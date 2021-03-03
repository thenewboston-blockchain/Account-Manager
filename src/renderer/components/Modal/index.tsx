import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {ButtonType, ButtonVariant, Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import {Form, FormButton, FormButtonProps} from '@renderer/components/FormComponents';
import Loader from '@renderer/components/FormElements/Loader';

import {GenericFormValues, GenericFunction} from '@renderer/types';

import './Modal.scss';

export interface ModalButtonProps extends FormButtonProps {
  content: ReactNode;
}

interface ComponentProps {
  cancelButton?: ModalButtonProps | string;
  className?: string;
  close(): void;
  disableOverlayClick?: boolean;
  displayCancelButton?: boolean;
  displayCloseButton?: boolean;
  displaySubmitButton?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  hideFooter?: boolean;
  ignoreDirty?: boolean;
  initialValues?: GenericFormValues;
  onSubmit?: GenericFunction;
  style?: CSSProperties;
  submitButton?: ModalButtonProps | string;
  submitting?: boolean;
  validateOnMount?: boolean;
  validationSchema?: any;
}

const Modal: FC<ComponentProps> = ({
  cancelButton,
  children,
  className,
  close,
  disableOverlayClick = false,
  displayCancelButton = true,
  displaySubmitButton = true,
  footer,
  header,
  hideFooter = false,
  displayCloseButton = true,
  ignoreDirty: ignoreDirtyProps = false,
  initialValues = {},
  onSubmit,
  style,
  submitButton,
  submitting = false,
  validateOnMount,
  validationSchema,
}) => {
  const ignoreDirty = useMemo<boolean>(() => ignoreDirtyProps || Object.keys(initialValues).length === 0, [
    ignoreDirtyProps,
    initialValues,
  ]);

  const cancelProps = useMemo<Omit<ModalButtonProps, 'children'>>(() => {
    if (typeof cancelButton === 'string') {
      return {
        content: cancelButton,
        ignoreDirty,
        onClick: close,
        submitting,
        variant: ButtonVariant.link,
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
      variant: cancelButton?.variant ?? ButtonVariant.link,
    };
  }, [cancelButton, close, ignoreDirty, submitting]);

  const submitProps = useMemo<Omit<ModalButtonProps, 'children'>>(() => {
    if (typeof submitButton === 'string') {
      return {
        content: submitButton,
        ignoreDirty,
        submitting,
        type: ButtonType.submit,
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
      type: submitButton?.type ?? ButtonType.submit,
      variant: submitButton?.variant ?? undefined,
    };
  }, [ignoreDirty, submitButton, submitting]);

  const renderDefaultFooter = (): ReactNode => {
    return (
      <>
        {displayCancelButton && (
          <FormButton
            className={clsx('Modal__default-cancel', cancelProps.className, {
              ...bemify(className, '__default-cancel'),
            })}
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
            className={clsx('Modal__default-submit', submitProps.className, {
              ...bemify(className, '__default-submit'),
            })}
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
      <div
        className={clsx('Modal__overlay', {
          'Modal__overlay--submitting': submitting,
          ...bemify(className, '__overlay'),
          ...bemify(className, '__overlay--submitting', submitting),
        })}
        onClick={submitting || disableOverlayClick ? noop : close}
      />
      <div
        className={clsx(
          'Modal',
          {'Modal--default-position': !style, ...bemify(className, '--default-position', !style)},
          className,
        )}
        style={style}
      >
        <div className={clsx('Modal__header', {...bemify(className, '__header')})}>
          {typeof header === 'string' ? <h2>{header}</h2> : header}
          {displayCloseButton && (
            <Icon
              className={clsx('Modal__close-icon', {
                'Modal__close-icon--submitting': submitting,
                ...bemify(className, '__close-icon'),
                ...bemify(className, '__close-icon--submitting', submitting),
              })}
              disabled={submitting}
              icon={IconType.close}
              onClick={close}
            />
          )}
        </div>
        <Form
          className={clsx('Modal__form', {...bemify(className, '__form')})}
          initialValues={initialValues}
          onSubmit={onSubmit || noop}
          validateOnMount={validateOnMount}
          validationSchema={validationSchema}
        >
          <div
            className={clsx('Modal__content', {
              'Modal__content--no-footer': hideFooter,
              ...bemify(className, '__content'),
              ...bemify(className, '__content--no-footer', hideFooter),
            })}
          >
            {children}
          </div>
          {!hideFooter && (
            <div className={clsx('Modal__footer', {...bemify(className, '__footer')})}>
              {footer || renderDefaultFooter()}
            </div>
          )}
        </Form>
      </div>
    </>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
