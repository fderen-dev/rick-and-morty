import { FC } from 'react';

import { Card } from 'components/Card';

import { Character } from './types';

import styles from './characterCard.module.scss';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: FC<CharacterCardProps> = ({
  character,
  children,
}) => {
  return (
    <Card className={styles.card}>
      <div className={styles.generalsContainer}>
        <img
          src={character.image}
          alt={`Drawing of ${character.name}`}
          className={styles.image}
        />
        <p className={styles.name}>{character.name}</p>
      </div>
      {children}
    </Card>
  );
};
