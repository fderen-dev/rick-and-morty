import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import { Button, Variants as ButtonVariants } from 'components/Button';

import { useModalContext } from 'context/ModalContext';
import { LargerThanMobile, Mobile } from 'utils/Breakpoints';

import logo from 'assets/images/logo-48x48.png';

import { LanguageSelector } from './LanguageSelector';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

interface NavbarProps {}

const MenuMobile: FC = ({ children }) => {
  const { t } = useTranslation();
  const {
    close: closeModal,
    isOpen: isModalOpen,
    open: openModal
  } = useModalContext();

  const toggleModal = isModalOpen
    ? closeModal
    : () =>
        openModal(
          <div className={styles.menuMobile}>
            <nav id="menu">{children}</nav>
            <LanguageSelector vertical />
          </div>,
          { hasCloseButton: false }
        );

  useEffect(
    () => () => {
      closeModal();
    },
    [closeModal]
  );

  return (
    <>
      <span className="sr-only" id="mobile-menu-label">
        {t('navbar.menu-aria')}
      </span>
      <Button
        variant={ButtonVariants.RAW}
        onClick={toggleModal}
        className={cx(styles.hamburgerButton, { isOpen: isModalOpen })}
        aria-label={t('navbar.hamburger-aria')}
        label-for="menu"
        aria-expanded={isModalOpen}
        aira-labelled-by="mobile-menu-label"
      >
        <div className={styles.hamburgerIcon} aria-hidden="true" />
      </Button>
    </>
  );
};

const LargerThanMobileNavigation: FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <>
      <span className="sr-only" id="larger-than-mobile-menu-label">
        {t('navbar-menu-aria')}
      </span>
      <nav id="menu" aria-labelledby="larger-than-mobile-menu-label">
        {children}
      </nav>
    </>
  );
};

export const Navbar: FC<NavbarProps> = ({ children }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src={logo} alt={t('navbar.logo.alt')} width={48} height={48} />
      <Mobile>
        <MenuMobile>{children}</MenuMobile>
      </Mobile>
      <LargerThanMobile>
        <LargerThanMobileNavigation>{children}</LargerThanMobileNavigation>
        <LanguageSelector />
      </LargerThanMobile>
    </div>
  );
};
