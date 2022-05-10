import { VFC } from 'react';

import { Spinner } from 'components/Spinner/Spinner';

import { useQuotes } from './useQuotes';

export const Quotes: VFC = () => {
  const { areQuotesLoading, quote } = useQuotes();

  return (
    <div
      style={{
        color: 'white',
        position: 'relative',
        whiteSpace: 'pre-wrap',
        width: '100%'
      }}
    >
      {areQuotesLoading && <Spinner maxWidth="25%" />}
      {quote && <p>{quote.text}</p>}
    </div>
  );
};
