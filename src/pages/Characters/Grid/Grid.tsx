import { FC, memo } from 'react';

import { Character, CharacterCard } from '../CharacterCard';

import styles from './grid.module.scss';

interface GridProps {
  characters: Array<Character>;
}

const Grid_: FC<GridProps> = ({ characters }) => (
  <div className={styles.grid}>
    {characters.map((character) => (
      <CharacterCard character={character} key={character.id} />
    ))}
  </div>
);

export const Grid = memo(Grid_);
