import { VFC } from 'react';

import { Spinner } from 'components/Spinner/Spinner';

import { useQuotes } from './useQuotes';

import styles from './quotes.module.scss';

export const Quotes: VFC = () => {
  const { areQuotesLoading, quote } = useQuotes(20000, 25);

  return (
    <div className={styles.container}>
      {areQuotesLoading && <Spinner position="relative" maxWidth="25%" />}
      {quote && <p className={styles.quote}>{`"${quote.text}"`}</p>}
    </div>
  );
};
