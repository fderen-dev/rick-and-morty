import { FC } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import classNames from 'classnames';

import { Button, Variants as ButtonVariants } from 'components/Button';
import { Card } from 'components/Card';

import styles from './modal.module.scss';

interface ModalProps
  extends Pick<ReactModalProps, 'isOpen' | 'overlayClassName'> {
  contentClassName?: string;
  close: () => void;
  showCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({
  close,
  contentClassName,
  isOpen,
  overlayClassName,
  children,
  showCloseButton = true
}) => (
  <ReactModal
    appElement={document.getElementById('root') as HTMLElement}
    isOpen={isOpen}
    onRequestClose={close}
    className={classNames(styles.content, contentClassName)}
    overlayClassName={classNames(styles.overlay, overlayClassName)}
    contentElement={(props, children) => (
      <Card className={props.className}>
        {showCloseButton && (
          <Button
            variant={ButtonVariants.RAW}
            onClick={close}
            className={styles.closeButton}
          >
            close
          </Button>
        )}
        {children}
      </Card>
    )}
  >
    {children}
  </ReactModal>
);
