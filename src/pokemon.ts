import { fetchFromApi } from './api.js';

export interface PokemonSprites {
  [key: string]: string | null;
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: PokemonSprites;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export function fetchPokemon(nameOrId: string) {
  return fetchFromApi<PokemonResponse>('pokemon', nameOrId);
}
