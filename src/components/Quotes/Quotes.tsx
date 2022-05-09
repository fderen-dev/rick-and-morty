import { VFC } from 'react';

import { useQuotes } from './useQuotes';

export const Quotes: VFC = () => {
  const { isLoading, quote } = useQuotes();

  return (
    <div style={{ color: 'white', maxWidth: '100%', whiteSpace: 'pre-wrap' }}>
      {isLoading && <p>Loading</p>}
      {quote && <p>{quote.text}</p>}
    </div>
  );
};
