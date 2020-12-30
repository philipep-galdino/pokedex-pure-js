/*
    Acquires the pokemon API and requires
    assynchronally each pokemon's data.
*/

const filterInput = document.querySelector('#filter')

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateTemplate = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
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
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()
// Stores all promises resulted from the function referred.


filterInput.addEventListener('input', event => {
    const inputValue = event.target.value.toLowerCase()
    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        const pokemonName = card.querySelector('.card-title').textContent.toLowerCase()

        if (pokemonName.includes(inputValue)) {
            card.style.display = 'inline'
            return
        }

        card.style.display = 'none'
    })
})

Promise.all(pokemonPromises)
    .then(generateTemplate)
    .then(insertCardsIntoPage)
