import { createContext, FC, useCallback, useContext, useReducer } from 'react';
import sample from 'lodash/sample';
import { nanoid } from 'nanoid';

import { QUOTES_API_URL } from 'utils/constants';

import quotesReducer, { creators, initialState } from './QuotesReducer';
import { Quote } from './types';

interface ContextState {
  clearQuotes: () => void;
  fetchQuotes: () => void;
  pickQuote: () => Quote | undefined;
  areQuotesLoading: boolean;
  quotes?: Array<Quote>;
}

const QuotesContext = createContext({} as ContextState);

export const QuotesContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState);
  const { quotes, isLoading: areQuotesLoading } = state;

  const fetchQuotes = useCallback(async (amount: number = 2) => {
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

  const pickQuote = useCallback((): Quote | undefined => {
    if (quotes !== undefined) {
      let quote: Quote = sample(quotes) as Quote;
      let counter = 1;

      while (quote?.isSeen) {
        quote = sample(quotes) as Quote;
        counter++;

        if (counter === quotes.length) {
          throw new Error('Are quotes were seen');
        }
      }

      dispatch(creators.setQuoteSeenActionCreator(quote.id, true));
      return quote;
    }
  }, [quotes]);

  const clearQuotes = useCallback(() => {
    dispatch(creators.clearQuotesActionCreator());
  }, []);

  return (
    <QuotesContext.Provider
      value={{ areQuotesLoading, clearQuotes, fetchQuotes, pickQuote, quotes }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
