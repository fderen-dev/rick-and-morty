import { VFC } from 'react';

import { Spinner } from 'components/Spinner/Spinner';

import { useQuotes } from './useQuotes';

import styles from './quotes.module.scss';

export const Quotes: VFC = () => {
  const { areQuotesLoading, quote } = useQuotes(15000);

  return (
    <div className={styles.container}>
      {areQuotesLoading && <Spinner maxWidth="25%" />}
      {quote && <p className={styles.quote}>{`"${quote.text}"`}</p>}
    </div>
  );
};
