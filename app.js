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

    Promise.all(pokemonPromises)
        .then(pokemons => {
            /*
                Reduces the pokemons array with each pokemon's data into a string
                and destructures all the data - also mapped by the map function, to
                be used and displayed into our card list.
            */
            const listPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                accumulator += `
                    <li class="card">
                    <img class="card-image ${types[0]}" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' - ')}</p>
                    </li>
                `
                
                return accumulator    
            }, '')

            // Catches the <ul> tag from our page and appends our <li> cards 
            // from listPokemons.
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = listPokemons
        })
}

fetchPokemon()