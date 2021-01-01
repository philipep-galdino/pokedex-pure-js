const generatePokemonCards = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    /*
        Reduces the pokemons array with each pokemon's data into a string
        and destructures all the data - also mapped by the map function, to
        be used and displayed into our card list.
    */
     
    const pokemonTypes = types.map(typeInfo => typeInfo.type.name)
        
    accumulator += `
        <li class="card ${pokemonTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${pokemonTypes.join(' - ')}</p>
        </li>
    `
        
    return accumulator    
}, '')    

const insertCardsIntoPage = pokemons => {
    /*
        Catches the <ul> tag from our page and appends our <li> cards 
        from listPokemons.
    */    
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML += pokemons
}

export { generatePokemonCards, insertCardsIntoPage }