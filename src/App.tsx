import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Router } from 'Router';

import { Navigation } from 'components/Navigation';

import styles from './app.module.scss';

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className={styles.app}>
        <Navigation />
        <Router />
      </div>
    </>
  );
}

export default App;
