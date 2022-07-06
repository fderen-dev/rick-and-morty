/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { Spinner } from 'components/Spinner/Spinner';

import { RICK_AND_MORTY_API_URL } from 'utils/constants';

import {
  CharacterData,
  CharactersData,
  parseCharacterData,
} from './CharacterCard';
import { Grid } from './Grid';

import styles from './characters.module.scss';

export const CharactersPage: VFC = () => {
  const { t } = useTranslation();
  const fetchCharacters = async (page: number): Promise<CharactersData> => {
    const resp = await fetch(
      `${RICK_AND_MORTY_API_URL}character/?page=${page}`
    );

    if (!resp.ok) {
      throw new Error("Couldn't fetch characters");
    }

    return resp.json();
  };

  const { data, isError, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<
      CharactersData,
      (page: number) => Promise<CharactersData>,
      CharacterData
    >('characters', ({ pageParam = 1 }) => fetchCharacters(pageParam), {
      getNextPageParam: (lastPage) =>
        lastPage.info.next
          ? parseInt(lastPage.info.next.split('page=')[1])
          : undefined,
    });

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
            <Grid characters={data?.pages.map(parseCharacterData) ?? []} />
          </InfiniteScroll>
        </section>
      </main>
    </>
  );
};
