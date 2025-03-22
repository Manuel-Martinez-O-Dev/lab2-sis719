
import { PokemonResponse } from './pokemon.js';

export function renderPokemon(pokemon: PokemonResponse): void {
  const resultDiv = document.getElementById('result')!;
  resultDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p>ID: ${pokemon.id}</p>
    <p>Peso: ${pokemon.weight / 10} kg</p>
    <p>Tipos: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <p>Habilidades: ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    <div>
      ${Object.entries(pokemon.sprites)
        .filter(([_, value]) => typeof value === "string" && value !== null)
        .map(([key, value]) => `<img src="${value}" alt="${key}" title="${key}" />`)
        .join('')}
    </div>

  `;
}

