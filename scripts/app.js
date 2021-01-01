import { generatePokemonCards, insertCardsIntoPage } from './components/PokemonCard.js'

/*
    Acquires the pokemon API and requires
    assynchronally each pokemon's data.
*/

const filterInput = document.querySelector('#filter')

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))



const pokemonPromises = generatePokemonPromises()
// Stores all promises resulted from the function referred.

const filterPokemonCards = inputValue => card => {
    /*
        Changes the display status value of a Pokemon card according
        to what's the input value typed into the search bar.

        It receives the 'InputValue' param and returns the following 
        functions as a closure to access the 'InputValue' in it's scope.
    */
    const pokemonName = card.querySelector('.card-title').textContent.toLowerCase()
    const cardContainsInputValue = pokemonName.includes(inputValue)

    if (cardContainsInputValue) {
        card.style.display = 'inline'
        return
    }

    card.style.display = 'none'
}

const handleInputValue = event => {
    /*
        Receives the input from the user, typed into the search bar
        and searches for matches on each Pokemon Card specifically.
    */
    const inputValue = event.target.value.toLowerCase()
    const cards = document.querySelectorAll('.card')

    cards.forEach(filterPokemonCards(inputValue))
}

filterInput.addEventListener('input', handleInputValue)

Promise.all(pokemonPromises)
    .then(generatePokemonCards)
    .then(insertCardsIntoPage)
