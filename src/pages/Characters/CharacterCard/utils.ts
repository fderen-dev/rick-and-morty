import { Character, CharacterData } from './types';

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
