import { useEffect, useState, VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { RICK_AND_MORTY_API_URL } from 'utils/constants';

import { CharacterCard } from './CharacterCard/CharacterCard';
import { Character } from './CharacterCard/types';

import styles from './characters.module.scss';

export const CharactersPage: VFC = () => {
  const { t } = useTranslation();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const fetchCharacter = async (id: number) => {
      const resp = await fetch(`${RICK_AND_MORTY_API_URL}character/${id}`);

      if (resp.ok) {
        const data: Character = await resp.json();

        setCharacter(data);
      } else {
        throw new Error("Couldn't fetch character");
      }
    };

    try {
      fetchCharacter(1);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('charactersPage.title')}</title>
      </Helmet>
      <main className={styles.main}>
        <h1 className={styles.header}>{t('charactersPage.header')}</h1>
        <section>
          {character && <CharacterCard character={character} />}
        </section>
      </main>
    </>
  );
};
