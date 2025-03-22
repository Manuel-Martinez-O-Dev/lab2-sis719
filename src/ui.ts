
import { PokemonResponse } from './pokemon.js';
import { searchPokemon } from './index.js'

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

  updateHistory(pokemon.name);
  renderHistory();
}

function updateHistory(pokemonName: string) {
  let history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]');
  if (!history.includes(pokemonName)) {
    history.push(pokemonName);
    localStorage.setItem('pokemonHistory', JSON.stringify(history));
  }
}

export function getLastSearchedPokemon(): string | null {
  let history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]');
  return history.length > 0 ? history[history.length - 1] : null;
}

export function renderHistory() {
  const historyDiv = document.getElementById('history')!;
  let history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]');

  historyDiv.innerHTML = '<h3>Historial de Búsqueda</h3>';
  history.forEach((name: any) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.addEventListener('click', () => searchPokemon(name));
    historyDiv.appendChild(button);
  });
}