import { createContext, FC, useCallback, useContext, useReducer } from 'react';
import axios from 'axios';
import sample from 'lodash/sample';
import { nanoid } from 'nanoid';

import { QUOTES_API_URL } from 'utils/constants';

import quotesReducer, { creators, initialState } from './QuotesReducer';
import { Quote } from './types';

interface ContextState {
  clearQuotes: () => void;
  fetchQuotes: (amount?: number) => void;
  pickQuote: () => Quote | undefined;
  areQuotesLoading: boolean;
  quotes?: Array<Quote>;
}

interface QuotesResponse {
  data: Array<string>;
}

const QuotesContext = createContext({} as ContextState);

export const QuotesContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState);
  const { quotes, isLoading: areQuotesLoading } = state;

  const fetchQuotes = useCallback(async (amount: number = 10) => {
    dispatch(creators.setIsLoadingActionCreator(true));

    try {
      const { data: resp, status } = await axios.get<QuotesResponse>(
        `${QUOTES_API_URL}?paragraphs=${amount}&quotes=${1}`
      );

      if (status !== 200) {
        throw new Error('Could not fetch quotes');
      } else {
        dispatch(
          creators.setQuotesActionCreator(
            resp.data.map((entry) => ({
              id: nanoid(),
              isSeen: false,
              text: entry,
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
      let quote: Quote = sample(quotes)!;
      let counter = 1;

      while (quote?.isSeen) {
        quote = sample(quotes)!;
        counter++;

        if (counter === quotes.length) {
          throw new Error('All quotes were seen');
        }
      }

      dispatch(creators.setQuoteSeenActionCreator(quote.id, true));
      return quote;
    } else throw new Error('No quotes');
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
