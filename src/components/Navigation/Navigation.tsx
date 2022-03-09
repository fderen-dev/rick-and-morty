import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { Routes } from 'utils/constants';

import logo from 'assets/images/logo.svg';

import { Navbar } from './Navbar';
import { NavbarItem } from './NavbarItem';

import styles from './navigation.module.scss';

export const Navigation: VFC = () => {
  const { t } = useTranslation();

  return (
    <Navbar
      Logo={
        <NavbarItem to={Routes.Home} className={styles.logoContainer}>
          <img src={logo} alt={t('navbar.logo.alt')} width={48} height={48} />
        </NavbarItem>
      }
    >
      <NavbarItem
        to={Routes.Characters}
        text="Characters"
        className={styles.navbarItem}
      />
    </Navbar>
  );
};
