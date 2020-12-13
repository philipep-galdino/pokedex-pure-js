const fetchPokemon = () => {
    /*
        Acquires the pokemon API and requires
        assynchronally each pokemon's data.
    */

    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = [] // Stores all promises resulted from below code.
    
    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    
}

fetchPokemon()