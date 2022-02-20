import { FC } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import classNames from 'classnames';

import { Card } from 'components/Card';

import styles from './modal.module.scss';

interface ModalProps
  extends Pick<ReactModalProps, 'isOpen' | 'overlayClassName'> {
  contentClassName?: string;
  close: () => void;
}

export const Modal: FC<ModalProps> = ({
  close,
  contentClassName,
  isOpen,
  overlayClassName,
  children
}) => (
  <ReactModal
    appElement={document.getElementById('root') as HTMLElement}
    isOpen={isOpen}
    onRequestClose={close}
    className={classNames(styles.content, contentClassName)}
    overlayClassName={classNames(styles.overlay, overlayClassName)}
    contentElement={(props, children) => (
      <Card className={props.className}>{children}</Card>
    )}
  >
    {children}
  </ReactModal>
);
