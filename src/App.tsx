import { useTranslation } from 'react-i18next';

import { Navbar } from 'components/Navbar/Navbar';

import styles from './app.module.scss';

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
      <div className={ styles.app }>
          <Navbar />
          <main className={ styles.main }>
              <h1 style={ { color: "white" } }>{ t("home.header") }</h1>
          </main>
      </div>
  );
}

export default App;
