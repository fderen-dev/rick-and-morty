import { useRef, VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import axios from 'axios';
import classNames from 'classnames';

import { Quotes } from 'components/Quotes/Quotes';
import { Spinner } from 'components/Spinner/Spinner';

import { DAY_IN_MILISECONDS, RICK_AND_MORTY_API_URL } from 'utils/constants';

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

export const CharactersPage: VFC = () => {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLElement | null>(null);

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
    cacheTime: DAY_IN_MILISECONDS,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const hasData = data?.pages !== undefined && data.pages.length > 0;

  return (
    <>
      <Helmet>
        <title>{t('homePage.title')}</title>
      </Helmet>
      <main className={styles.main} ref={mainRef}>
        <section className={classNames(styles.section, styles.quotes)}>
          <Quotes />
        </section>
        <section className={styles.section}>
          <h2 className={styles.header}>{t('charactersPage.header')}</h2>
          {isError && <p>{error}</p>}
          <InfiniteScroll
            dataLength={data?.pages.length ?? 0}
            next={fetchNextPage}
            hasMore={Boolean(hasNextPage)}
            loader={
              <Spinner
                absolutelyCentered={false}
                position="relative"
                className={styles.spinner}
              />
            }
            scrollableTarget={mainRef}
            className={styles.inifiteScrollContainer}
          >
            {hasData && <Grid characters={getCharacters(data)} />}
          </InfiniteScroll>
        </section>
      </main>
    </>
  );
};
