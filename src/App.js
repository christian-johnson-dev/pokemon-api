import { useState, useEffect } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=40")
      .then((response) => response.json())
      .then((response) => setPokemonData(response.results));
  }, []);
  console.log(pokemonData);
  return (
    <div className="App">
      <h1>Rollcall</h1>
      {pokemonData.length > 0 &&
        pokemonData.map((pokemon) => {
          return <div key={pokemon.id}>{pokemon.name}</div>;
        })}
    </div>
  );
}
export default App;
