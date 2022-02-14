import { StrictMode, Suspense } from 'react';

import { ModalProvider } from 'context/ModalContext';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import './index.scss';

ReactDOM.render(
    <StrictMode>
        <Suspense fallback="loading">
            <ModalProvider>
                <App />
            </ModalProvider>
        </Suspense>
    </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
