/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { RICK_AND_MORTY_API_URL } from 'utils/constants';

import {
  Character,
  CharacterCard,
  CharacterData,
  CharactersData,
  parseCharacterData,
} from './CharacterCard';

import styles from './characters.module.scss';

export const CharactersPage: VFC = () => {
  const { t } = useTranslation();
  const [character, setCharacter] = useState<Character>();
  const [characters, setCharacters] = useState<Array<Character>>([]);

  useEffect(() => {
    const fetchCharacter = async (id: number) => {
      const resp = await fetch(`${RICK_AND_MORTY_API_URL}character/${id}`);

      if (resp.ok) {
        const data: CharacterData = await resp.json();

        setCharacter(parseCharacterData(data));
      } else {
        throw new Error("Couldn't fetch character");
      }
    };

    const fetchCharacters = async (page: number = 1) => {
      const resp = await fetch(
        `${RICK_AND_MORTY_API_URL}character/?page=${page}`
      );

      if (resp.ok) {
        const data: CharactersData = await resp.json();

        setCharacters(data.results.map(parseCharacterData));
      }
    };

    try {
      fetchCharacters(1);
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
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'center',
            }}
          >
            {characters.length > 0 &&
              characters.map((char) => (
                <CharacterCard character={char} key={char.id} />
              ))}
          </div>
        </section>
      </main>
    </>
  );
};
