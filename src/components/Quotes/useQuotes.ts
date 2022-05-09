import { useCallback, useEffect, useReducer, useState } from 'react';
import sample from 'lodash/sample';
import { nanoid } from 'nanoid';

import { QUOTES_API_URL } from 'utils/constants';
import { IntervalHandle } from 'utils/types';

import quotesReducer, { creators, initialState } from './QuotesReducer';
import { Quote } from './types';

export const useQuotes = (timeout: number = 10000) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState);
  const [quote, setQuote] = useState<Quote>();

  const fetchQuotes = useCallback(async (amount: number = 30) => {
    dispatch(creators.setIsLoadingActionCreator(true));

    try {
      const resp = await fetch(
        `${QUOTES_API_URL}?paragraphs=${amount}&quotes=${1}`
      );

      if (!resp.ok) {
        const message = await resp.text();

        throw message;
      } else {
        const { data }: { data: Array<string> } = await resp.json();

        dispatch(
          creators.setQuotesActionCreator(
            data.map((entry) => ({
              id: nanoid(),
              isSeen: false,
              text: entry
            }))
          )
        );
      }
    } catch (error) {
      dispatch(creators.setErrorActionCreator(JSON.stringify(error)));
    } finally {
      dispatch(creators.setIsLoadingActionCreator(false));
    }
  }, []);

  const pickQuote = useCallback(() => {
    if (state.quotes !== undefined) {
      let quote: Quote = sample(state.quotes) as Quote;
      let counter = 1;

      while (quote?.isSeen) {
        quote = sample(state.quotes) as Quote;
        counter++;

        if (counter === state.quotes.length) {
          dispatch(creators.clearQuotesActionCreator());

          return;
        }
      }

      dispatch(creators.setQuoteSeenActionCreator(quote.id, true));
      setQuote(quote);
    }
  }, [state.quotes]);

  useEffect(() => {
    let intervalHandle: IntervalHandle | null = null;

    if (!state.quotes) {
      fetchQuotes();

      return;
    }

    if (!intervalHandle) {
      intervalHandle = setInterval(() => {
        pickQuote();
      }, timeout);
    }

    return () => {
      if (intervalHandle) {
        clearInterval(intervalHandle);
        intervalHandle = null;
      }
    };
  }, [timeout, state.quotes, fetchQuotes, pickQuote]);

  return { isLoading: state.isLoading, quote };
};
