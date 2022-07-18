import { VFC } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { useQuotes } from './useQuotes';

import styles from './quotes.module.scss';

const QUOTES_TIMEOUT_MS = 5000;
const QUOTES_TO_FETCH = 25;
const SLIDE_ANIMATION_TIMEOUT_MS = 20000;

export const Quotes: VFC = () => {
  const { quote } = useQuotes(QUOTES_TIMEOUT_MS, QUOTES_TO_FETCH);

  return (
    <div className={styles.container}>
      {quote && (
        <SwitchTransition mode="out-in">
          <CSSTransition
            in
            appear
            classNames="slide"
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            timeout={SLIDE_ANIMATION_TIMEOUT_MS}
            key={quote.id}
          >
            <p className={styles.quote}>{`"${quote.text}"`}</p>
          </CSSTransition>
        </SwitchTransition>
      )}
    </div>
  );
};
