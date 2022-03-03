import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Router } from 'Router';

import { Navbar } from 'components/Navbar/Navbar';

import { Routes } from 'utils/constants';

import logo from 'assets/images/logo-48x48.png';

import styles from './app.module.scss';

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.app}>
      <Navbar
        Logo={
          <Link to={Routes.Home}>
            <img src={logo} alt={t('navbar.logo.alt')} width={48} height={48} />
          </Link>
        }
      >
        <Link to={Routes.Characters}>Characters</Link>
      </Navbar>
      <Router />
    </div>
  );
}

export default App;
