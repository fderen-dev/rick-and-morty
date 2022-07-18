import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Quotes } from 'components/Quotes/Quotes';

export const HomePage: VFC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('homePage.title')}</title>
      </Helmet>
      <main
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <h1 style={{ margin: '32px 0' }}>{t('homePage.header')}</h1>
        <section style={{ width: '100%' }}>
          <Quotes />
        </section>
      </main>
    </>
  );
};
