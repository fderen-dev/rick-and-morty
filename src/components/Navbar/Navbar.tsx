import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import { Button, Variants as ButtonVariants } from 'components/Button';

import { useModalContext } from 'context/ModalContext';
import { Desktop, Mobiles } from 'utils/Breakpoints';

import logo from 'assets/images/logo-48x48.png';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

interface NavbarProps {}

const MobileNavigation: FC = ({ children }) => {
  const { t } = useTranslation();
  const {
    close: closeModal,
    isOpen: isModalOpen,
    open: openModal
  } = useModalContext();

  const toggleModal = isModalOpen
    ? closeModal
    : () => openModal(<nav>{children}</nav>, { hasCloseButton: false });

  useEffect(
    () => () => {
      closeModal();
    },
    [closeModal]
  );

  return (
    <Button
      variant={ButtonVariants.RAW}
      onClick={toggleModal}
      className={cx(styles.hamburgerButton, { isOpen: isModalOpen })}
      aria-label={t(
        `navbar.hamburger-menu.aria-${isModalOpen ? 'open' : 'close'}`
      )}
    >
      <div className={styles.hamburgerIcon} />
    </Button>
  );
};

const DesktopNavigation: FC = ({ children }) => (
  <div className={styles.content}>
    <nav>{children}</nav>
    <div>language selector</div>
  </div>
);

export const Navbar: FC<NavbarProps> = ({ children }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div>
        <img src={logo} alt={t('navbar.logo.alt')} width={48} height={48} />
      </div>
      <Mobiles>
        <MobileNavigation>{children}</MobileNavigation>
      </Mobiles>
      <Desktop>
        <DesktopNavigation>{children}</DesktopNavigation>
      </Desktop>
    </div>
  );
};
