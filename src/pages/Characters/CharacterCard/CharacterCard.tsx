import { FC, FocusEvent, MouseEvent, useState, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import { Card, CardProps } from 'components/Card';

import { Character } from './types';

import styles from './characterCard.module.scss';

const cx = classNames.bind({
  detailed: styles.detailed,
});

interface CharacterCardListItemProps {
  labelTransKey: string;
  valueTransKey?: string;
  value?: string;
}

const CharacterCardListItem: VFC<CharacterCardListItemProps> = ({
  labelTransKey,
  valueTransKey,
  value,
}) => {
  const { t } = useTranslation();

  const valueToDisplay = value ?? (valueTransKey ? t(valueTransKey!) : '');

  return (
    <li className={styles.item}>
      <span>{`${t(labelTransKey)}:`}</span>
      <span>{valueToDisplay}</span>
    </li>
  );
};

interface SimpleCharacterCardProps
  extends Pick<Character, 'name' | 'image'>,
    Pick<CardProps, 'onBlur' | 'onMouseOut'> {
  className?: string;
}

const SimpleCharacterCard: FC<SimpleCharacterCardProps> = ({
  name,
  image,
  children,
  onBlur,
  onMouseOut,
  className,
}) => {
  return (
    <Card
      onBlur={onBlur}
      onMouseOut={onMouseOut}
      className={cx(styles.card, className)}
    >
      <div className={styles.generalsContainer}>
        <img src={image} alt={`Drawing of ${name}`} className={styles.image} />
        <p className={styles.name}>{name}</p>
      </div>
      {children}
    </Card>
  );
};

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: VFC<CharacterCardProps> = ({ character }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleFocus = () => setIsSelected(true);

  const handleBlur = (
    event: MouseEvent<HTMLDivElement> | FocusEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setIsSelected(false);
  };

  return (
    <div
      onFocusCapture={handleFocus}
      onMouseOverCapture={handleFocus}
      onMouseOutCapture={handleBlur}
      onBlurCapture={handleBlur}
      className={styles.container}
    >
      <SimpleCharacterCard
        name={character.name}
        image={character.image}
        className={cx({ detailed: isSelected })}
      >
        {isSelected && (
          <p className={styles.details}>
            <ul className={styles.list}>
              <CharacterCardListItem
                labelTransKey="charactersPage.character.status"
                valueTransKey={`charactersPage.character.statuses.${character.status.toLowerCase()}`}
              />
              <CharacterCardListItem
                labelTransKey="charactersPage.character.species"
                valueTransKey={`charactersPage.character.speciesNames.${character.species.toLowerCase()}`}
              />
              <CharacterCardListItem
                labelTransKey="charactersPage.character.gender"
                valueTransKey={`charactersPage.character.genders.${character.gender.toLowerCase()}`}
              />
              <CharacterCardListItem
                labelTransKey="charactersPage.character.origin"
                value={character.origin}
              />
              <CharacterCardListItem
                labelTransKey="charactersPage.character.location"
                value={character.location}
              />
              <CharacterCardListItem
                labelTransKey="charactersPage.character.created"
                value={character.created}
              />
            </ul>
          </p>
        )}
      </SimpleCharacterCard>
    </div>
  );
};
