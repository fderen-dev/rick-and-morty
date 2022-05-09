import { VFC } from 'react';

import { useQuotes } from './useQuotes';

export const Quotes: VFC = () => {
  const { areQuotesLoading, quote } = useQuotes();

  return (
    <div style={{ color: 'white', maxWidth: '100%', whiteSpace: 'pre-wrap' }}>
      {quote && <p>{quote.text}</p>}
    </div>
  );
};
