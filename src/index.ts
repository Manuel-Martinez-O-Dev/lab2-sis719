
import { fetchPokemon } from './pokemon.js';
import { renderPokemon, getLastSearchedPokemon, renderHistory } from './ui.js';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;

const siguiente = document.getElementById('nextBtn') as HTMLButtonElement;
const anterior = document.getElementById('prevBtn') as HTMLButtonElement;

const historyDiv = document.createElement('history');

const resultDiv = document.getElementById('result')!;

resultDiv.before(historyDiv);
resultDiv.before(anterior, siguiente);

let currentPokemonId: number | null = null;

button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;
  searchPokemon(name);
});

anterior.addEventListener('click', () => {
  if (currentPokemonId && currentPokemonId > 1) {
    searchPokemon((currentPokemonId - 1).toString());
  }
});

siguiente.addEventListener('click', () => {
  if (currentPokemonId) {
    searchPokemon((currentPokemonId + 1).toString());
  }
});

export async function searchPokemon(name: string) {
  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(name);
    currentPokemonId = pokemon.id;
    renderPokemon(pokemon);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
}

const lastPokemon = getLastSearchedPokemon();
if (lastPokemon) {
  searchPokemon(lastPokemon);
}

renderHistory();