import Button from '@components/atoms/button';
import Input from '@components/atoms/input';
import Typography from '@components/atoms/typography';
import { useHttp } from '@hooks/useHttp';
import { fetchPokemonByName } from '@services/pokemon.service';
import { useState } from 'react';

const Pokemon = () => {
  const { data, loading, refresh: searchPokemon, error } = useHttp(fetchPokemonByName);

  const [pokemon, setPokemon] = useState('');

  const handlePokemonChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleFetchPokemonByName = async () => {
    await searchPokemon(pokemon);
  };

  return (
    <>
      <Typography variant="h1">Pokemon</Typography>
      <Input
        id="pokemon-name"
        type="text"
        value={pokemon}
        onChange={handlePokemonChange}
        placeholder="Enter a pokemon name"
      />
      <Button variant="primary" onClick={handleFetchPokemonByName}>
        Search
      </Button>
      {loading ? '...' : null}
      {error ? <span>{error}</span> : null}
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </>
  );
};

export default Pokemon;
