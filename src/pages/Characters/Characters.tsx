import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const CharactersPage: VFC = () => {
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
      <h1>{t('charactersPage.header')}</h1>
    </main>
  );
};
