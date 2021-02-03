export type Pokemon = {
  name: string;
  url: string;
};

export type PokeList = {
  count: number;
  results: Pokemon[];
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokeInfo = {
  height: number;
  base_experience: number;
  abilities: Ability[];
  name: string;
};

export async function pokeList(): Promise<PokeList> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);

  return await res.json();
}

export async function pokeInfo(name: string): Promise<PokeInfo | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    return await res.json();
  } catch {
    return null;
  }
}
