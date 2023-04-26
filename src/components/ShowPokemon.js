import { useEffect, useState } from "react";

function ShowPokemon() {
  // 1) Set up our state
  const [pokemonData, setPokemonData] = useState([]);

  // 2) useEffect to make our API call
  useEffect(() => {
    fetchAllPokemon();
  }, []);

  // 3) Fetch the list of pokemon from the API
  const fetchAllPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1010")
      .then((responseAll) => responseAll.json())
      .then((allData) => {
        // 4) Extract the data from the responseAll
        const results = allData.results;
        // 3) For each pokemon, fetch the data from the API
        const fetchOnePokemon = results.map((pokemon) => {
          return fetch(pokemon.url)
            .then((responseOne) => responseOne.json())
            .then((oneData) => {
              // 4) Extract the data from the responseOne
              return {
                id: oneData.id,
                name: oneData.name,
                image: oneData.sprites.front_default,
              };
            });
        });
        // 5) Wait for all the promises to finish
        Promise.all(fetchOnePokemon).then((fetchAllPokemon) => {
          // 6) Set the data to state
          setPokemonData(fetchAllPokemon);
        });
      });
  };

  return (
    <div className="pokeWrapper">
      {/* map the useState data */}
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="pokeCard">
          <h3>{pokemon.name}</h3>
          <span>ID: {pokemon.id}</span>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
}

export default ShowPokemon;
