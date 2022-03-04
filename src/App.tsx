import { Router } from 'Router';

import { Navigation } from 'components/Navigation';

import styles from './app.module.scss';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <Navigation />
      <Router />
    </div>
  );
}

export default App;
