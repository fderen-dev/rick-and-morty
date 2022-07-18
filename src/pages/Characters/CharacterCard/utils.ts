import {
  Character,
  CharacterData,
  CharacterStatus,
  CharacterStatusType,
} from './types';

export const parseCharacterData = (character: CharacterData): Character => {
  const char = {
    ...character,
    created: new Date(character.created).toLocaleDateString(),
    location: character.location.name,
    origin: character.origin.name,
  };

  delete char.episode;

  return char;
};

export const getCharacterStatusColor = (status: CharacterStatusType) => {
  switch (status) {
    case CharacterStatus.ALIVE: {
      return 'green';
    }
    case CharacterStatus.DEAD: {
      return 'red';
    }
    default:
      return 'black';
  }
};
