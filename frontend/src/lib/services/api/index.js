import HttpClient from '../httpClient';

export const apiClient = new HttpClient(import.meta.env.VITE_API_URL);
export const apiClientPokemon = new HttpClient(import.meta.env.VITE_API_POKEMON_URL);
