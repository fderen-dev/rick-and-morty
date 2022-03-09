import { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import { Button, Variants as ButtonVariants } from 'components/Button';

import { useModalContext } from 'context/ModalContext';
import { LargerThanMobile, Mobile } from 'utils/Breakpoints';

import { LanguageSelector } from '../LanguageSelector';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

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
            <nav id="menu" className={styles.navigationMobile}>
              {children}
            </nav>
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
      <nav
        id="menu"
        aria-labelledby="larger-than-mobile-menu-label"
        className={styles.navbar}
      >
        {children}
      </nav>
    </>
  );
};

interface NavbarProps {
  Logo?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ Logo, children }): JSX.Element => {
  return (
    <div className={styles.container}>
      {Logo}
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
