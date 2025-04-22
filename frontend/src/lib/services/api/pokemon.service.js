import { apiClientPokemon } from './index';

const path = 'pokemon';

export function fetchPokemons() {
  return apiClientPokemon.get(`${path}`);
}

export function fetchPokemonById(id) {
  return apiClientPokemon.get(`${path}/${id}`);
}

export function fetchPokemonByName(name) {
  return apiClientPokemon.get(`${path}/${name}`);
}

export function createPokemon(data) {
  return apiClientPokemon.post(path, data);
}

export function updatePokemon(id, data) {
  return apiClientPokemon.put(`${path}/${id}`, data);
}

export function deletePokemon(id) {
  return apiClientPokemon.delete(`${path}/${id}`);
}
