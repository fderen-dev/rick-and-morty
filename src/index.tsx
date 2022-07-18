import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { QuotesContextProvider } from 'components/Quotes/QuotesContext';

import { ModalProvider } from 'context/ModalContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <Suspense fallback="loading">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <IconContext.Provider value={{ color: '#000' }}>
            <ModalProvider>
              <QuotesContextProvider>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </QuotesContextProvider>
            </ModalProvider>
          </IconContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
