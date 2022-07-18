import { FC, memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Character, CharacterCard } from '../CharacterCard';

import styles from './grid.module.scss';

const GROW_ANIMATION_TIMEOUT_MS = 400;

interface GridProps {
  characters: Array<Character>;
}

const Grid_: FC<GridProps> = ({ characters }) => {
  return (
    <TransitionGroup component="div" className={styles.grid}>
      {characters.map((character) => (
        <CSSTransition
          in
          appear
          classNames="grow"
          timeout={GROW_ANIMATION_TIMEOUT_MS}
          key={character.id}
        >
          <CharacterCard character={character} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export const Grid = memo(Grid_);
