import React, {CSSProperties, FC, ReactNode} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';

import {Form, FormButton} from '@renderer/components/FormComponents';
import Icon from '@renderer/components/Icon';
import {GenericFormOnSubmit, GenericFormValues} from '@renderer/types/forms';

import './Modal.scss';

// Usage Guide
// --
// use `header` or `title` prop to render the header
// use 'footer' or ( 'submitButtonContent' | 'cancelButtonContent' ) prop to render the footer
// --
interface ModalProps {
  cancelButtonContent?: ReactNode;
  className?: string;
  footer?: ReactNode;
  header?: ReactNode;
  initialValues?: GenericFormValues;
  onSubmit: GenericFormOnSubmit;
  open: boolean;
  close(): void;
  style?: CSSProperties;
  submitButtonContent?: ReactNode;
  title?: string;
}

const defaultStyle: CSSProperties = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 324,
};

const Modal: FC<ModalProps> = ({
  cancelButtonContent = 'Cancel',
  children,
  className,
  close,
  footer,
  header,
  initialValues = {},
  onSubmit,
  open,
  style = defaultStyle,
  submitButtonContent = 'Submit',
  title,
}) => {
  const renderDefaultFooter = () => {
    const ignoreDirty = Object.keys(initialValues).length === 0;
    return (
      <>
        <FormButton className="Modal__default-cancel" ignoreDirty={ignoreDirty} onClick={close} variant="link">
          {cancelButtonContent}
        </FormButton>
        <FormButton className="Modal__default-submit" ignoreDirty={ignoreDirty} type="submit">
          {submitButtonContent}
        </FormButton>
      </>
    );
  };

  return open
    ? createPortal(
        <>
          <div className="Modal__overlay" onClick={close} />
          <div className={clsx('Modal', className)} style={style}>
            <div className="Modal__header">
              {header || <h2>{title}</h2>}
              <Icon className="Icon__close" icon="close" onClick={close} />
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
