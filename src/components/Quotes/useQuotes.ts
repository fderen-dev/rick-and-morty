import { useEffect, useState } from 'react';

import { IntervalHandle } from 'utils/types';

import { useQuotesContext } from './QuotesContext';
import { Quote } from './types';

export const useQuotes = (timeout: number = 10000) => {
  const {
    areQuotesLoading,
    clearQuotes,
    fetchQuotes,
    pickQuote,
    quotes
  } = useQuotesContext();
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    let intervalHandle: IntervalHandle | null = null;

    const _clearInterval = () => {
      if (intervalHandle) {
        clearInterval(intervalHandle);
        intervalHandle = null;
      }
    };

    if (!quotes?.length) {
      fetchQuotes();

      return;
    }

    setQuote(pickQuote());

    if (!intervalHandle) {
      intervalHandle = setInterval(() => {
        try {
          setQuote(pickQuote());
        } catch {
          _clearInterval();
          clearQuotes();
        }
      }, timeout);
    }

    return () => {
      _clearInterval();
    };
  }, [timeout, quotes?.length, fetchQuotes, pickQuote, clearQuotes]);

  return { areQuotesLoading, quote };
};
