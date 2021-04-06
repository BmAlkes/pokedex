const pokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const generatePokemon = () => Array(150).fill().map((_, index)=>
fetch(pokemonUrl(index + 1)).then((response) => response.json()))

const generateHtml = pokemons =>{
  return pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

      accumulator += `<li class="card ${types[0]}">
        <img class="card-image" alt="${
          pokemon.name
        }" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
        <h2 class="card-title">${pokemon.id} ${pokemon.name}
        <p class="card-subtitle">${types.join(" | ")}</p>
        </li>`;
      return accumulator;
    }, "");
}

const fetchPokemon = () => {
  const pokemonPromise = generatePokemon()
  Promise.all(pokemonPromise)
  .then(generateHtml)
  .then( pokemons =>{
      const ul = document.querySelector('[data-js="pokedex"]');
      ul.innerHTML = pokemons
  })
};

fetchPokemon();
