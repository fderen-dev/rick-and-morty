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
      <ul className={styles.list}>
        {Object.entries(character).map(([key, value]) => (
          <li key={key}>{`${key}: ${JSON.stringify(value, null, 2)}`}</li>
        ))}
      </ul>
      {children}
    </Card>
  );
};
