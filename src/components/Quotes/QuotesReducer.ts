import { Quote } from './types';

enum QuotesActionType {
  SetQuotes = 'SET_QUOTES',
  ClearQuotes = 'CLEAR_QUOTES',
  SetIsLoading = 'SET_IS_LOADING',
  SetError = 'SET_ERROR',
  SetSeen = 'SET_SEEN',
}

type SetQuoteSeenPayload = { id: string; isSeen: boolean };
type SetQuotesActionPayload = { quotes: Array<Quote> };
type SetIsLoadingPayload = { isLoading: boolean };
type SetErrorPayload = { errorMessage: string };

interface QuotesAction {
  type: QuotesActionType;
  payload: unknown;
}

const setQuotesActionCreator = (quotes: Array<Quote>): QuotesAction => ({
  payload: { quotes },
  type: QuotesActionType.SetQuotes,
});

const clearQuotesActionCreator = (): QuotesAction => ({
  payload: undefined,
  type: QuotesActionType.ClearQuotes,
});

const setIsLoadingActionCreator = (isLoading: boolean): QuotesAction => ({
  payload: { isLoading },
  type: QuotesActionType.SetIsLoading,
});

const setErrorActionCreator = (errorMessage: string): QuotesAction => ({
  payload: { errorMessage },
  type: QuotesActionType.SetError,
});

const setQuoteSeenActionCreator = (
  id: string,
  isSeen: boolean
): QuotesAction => ({
  payload: { id, isSeen },
  type: QuotesActionType.SetSeen,
});

interface QuotesState {
  isLoading: boolean;
  hasError: boolean;
  quotes?: Array<Quote>;
  error?: string;
}

export const initialState: QuotesState = {
  error: undefined,
  hasError: false,
  isLoading: false,
  quotes: undefined,
};

const markQuoteSeen = (
  state: QuotesState,
  payload: SetQuoteSeenPayload
): QuotesState => {
  const tempState = { ...state };
  const quoteOfIntrest = tempState.quotes?.find((q) => q.id === payload?.id);

  if (quoteOfIntrest && payload?.isSeen !== undefined) {
    quoteOfIntrest.isSeen = payload.isSeen;
  }

  return tempState;
};

export const quotesReducer = (
  state: QuotesState,
  action: QuotesAction
): QuotesState => {
  switch (action.type) {
    case QuotesActionType.SetIsLoading: {
      return {
        ...state,
        error: undefined,
        hasError: false,
        isLoading: (action.payload as SetIsLoadingPayload).isLoading,
      };
    }
    case QuotesActionType.SetError: {
      return {
        ...state,
        error: (action.payload as SetErrorPayload).errorMessage,
        hasError: true,
        isLoading: false,
      };
    }
    case QuotesActionType.SetQuotes: {
      return {
        ...state,
        error: undefined,
        hasError: false,
        isLoading: false,
        quotes: (action.payload as SetQuotesActionPayload).quotes,
      };
    }
    case QuotesActionType.ClearQuotes: {
      return {
        ...state,
        quotes: undefined,
      };
    }
    case QuotesActionType.SetSeen: {
      return markQuoteSeen(state, action.payload as SetQuoteSeenPayload);
    }
    default:
      return state;
  }
};

export const creators = {
  clearQuotesActionCreator,
  setErrorActionCreator,
  setIsLoadingActionCreator,
  setQuoteSeenActionCreator,
  setQuotesActionCreator,
};

export default quotesReducer;
