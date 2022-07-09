import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import axios from 'axios';

import { Spinner } from 'components/Spinner/Spinner';

import { RICK_AND_MORTY_API_URL } from 'utils/constants';

import {
  Character,
  CharactersResponse,
  parseCharacterData,
} from './CharacterCard';
import { Grid } from './Grid';

import styles from './characters.module.scss';

const getCharacters = (
  infiniteData?: InfiniteData<CharactersResponse>
): Array<Character> => {
  if (!infiniteData) return [];

  return infiniteData.pages.reduce((acc, curr) => {
    return [...acc, ...curr.results.map(parseCharacterData)];
  }, [] as Array<Character>);
};

export const CharactersPage: VFC = () => {
  const { t } = useTranslation();
  const fetchCharacters = async ({
    pageParam = 1,
  }): Promise<CharactersResponse> => {
    const { data, status } = await axios.get<CharactersResponse>(
      `${RICK_AND_MORTY_API_URL}character/?page=${pageParam}`
    );

    if (status !== 200) {
      throw new Error("Couldn't fetch characters");
    }

    return data;
  };

  const { data, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery<
    CharactersResponse,
    string
  >(['characters'], fetchCharacters, {
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        return lastPage.info.next.split('page=')[1];
      } else {
        return undefined;
      }
    },
  });

  const hasData = data?.pages !== undefined && data.pages.length > 0;

  return (
    <>
      <Helmet>
        <title>{t('charactersPage.title')}</title>
      </Helmet>
      <main className={styles.main}>
        <h1 className={styles.header}>{t('charactersPage.header')}</h1>
        <section className={styles.section}>
          {isError && <p>{error}</p>}
          <InfiniteScroll
            dataLength={data?.pages.length ?? 0}
            next={fetchNextPage}
            hasMore={Boolean(hasNextPage)}
            loader={<Spinner absolutelyCentered position="absolute" />}
          >
            {hasData && <Grid characters={getCharacters(data)} />}
          </InfiniteScroll>
        </section>
      </main>
    </>
  );
};
