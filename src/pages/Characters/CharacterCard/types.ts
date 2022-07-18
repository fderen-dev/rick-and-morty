type DetailedTrait = {
  name: string;
  url: string;
};

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'Uknown',
}

export type CharacterStatusType = `${CharacterStatus}`;

enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'Unknown',
}

type CharacterGenderType = `${CharacterGender}`;

export type CharacterData = {
  id: number;
  name: string;
  status: CharacterStatusType;
  species: string;
  type: string;
  gender: CharacterGenderType;
  origin: DetailedTrait;
  location: DetailedTrait;
  image: string;
  episode?: Array<string>;
  url: string;
  created: string;
};

export type Character = Omit<
  CharacterData,
  'origin' | 'location' | 'episode' | 'url' | 'created'
> & {
  origin: string;
  location: string;
  created: string;
};

type PaginationInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type CharactersResponse = {
  info: PaginationInfo;
  results: Array<CharacterData>;
};
