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

    const handleQuotePick = () => {
      try {
        setQuote(pickQuote());
      } catch {
        _clearInterval();
        clearQuotes();
      }
    };

    if (!quotes?.length) {
      fetchQuotes();

      return;
    }

    handleQuotePick();

    if (!intervalHandle) {
      intervalHandle = setInterval(handleQuotePick, timeout);
    }

    return () => {
      _clearInterval();
    };
  }, [timeout, quotes?.length, fetchQuotes, pickQuote, clearQuotes]);

  return { areQuotesLoading, quote };
};
