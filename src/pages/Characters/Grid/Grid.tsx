import { FC, memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Character, CharacterCard } from '../CharacterCard';

import styles from './grid.module.scss';

interface GridProps {
  characters: Array<Character>;
}

const Grid_: FC<GridProps> = ({ characters }) => (
  <TransitionGroup component="div" className={styles.grid}>
    {characters.map((character) => (
      <CSSTransition
        appear
        classNames="cardTransition"
        timeout={700}
        key={character.id}
      >
        <CharacterCard character={character} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export const Grid = memo(Grid_);
