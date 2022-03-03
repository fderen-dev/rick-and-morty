import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: VFC = () => {
  const { t } = useTranslation();

  return (
    <main
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <h1 style={{ color: 'white' }}>{t('homePage.header')}</h1>
    </main>
  );
};
