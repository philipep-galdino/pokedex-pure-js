import { PokemonCards, insertCardsIntoPage } from './components/PokemonCard.js'
import handleInputValue from './controllers/PokemonController.js'

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

filterInput.addEventListener('input', handleInputValue)

Promise.all(pokemonPromises)
    .then(PokemonCards)
    .then(insertCardsIntoPage)
