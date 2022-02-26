import { FC, useEffect } from 'react';
import { t } from 'i18next';

import { Button, Variants as ButtonVariants } from 'components/Button';

import { useModalContext } from 'context/ModalContext';
import { Desktop, Mobiles } from 'utils/Breakpoints';

import logo from 'assets/images/logo-48x48.png';

import styles from './navbar.module.scss';

interface NavbarProps {}

const MobileNavigation: FC = ({ children }) => {
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
    <Button variant={ButtonVariants.RAW} onClick={toggleModal} text="open" />
  );
};

const DesktopNavigation: FC = ({ children }) => (
  <div className={styles.content}>
    <nav>{children}</nav>
    <div>language selector</div>
  </div>
);

export const Navbar: FC<NavbarProps> = ({ children }): JSX.Element => {
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
