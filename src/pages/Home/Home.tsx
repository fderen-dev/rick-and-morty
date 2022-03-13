import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

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
          height: '100%',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <h1 style={{ margin: '32px 0' }}>{t('homePage.header')}</h1>
      </main>
    </>
  );
};
