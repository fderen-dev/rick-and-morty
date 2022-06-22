type DetailedTrait = {
  name: string;
  url: string;
};

enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'Uknown',
}

type CharacterStatusType = `${CharacterStatus}`;

enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'Unknown',
}

type CharacterGenderType = `${CharacterGender}`;

export type Character = {
  id: number;
  name: string;
  status: CharacterStatusType;
  species: string;
  type: string;
  gender: CharacterGenderType;
  origin: DetailedTrait;
  location: DetailedTrait;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
};
