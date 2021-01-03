export default {
    filterPokemonCards: inputValue => card => {
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
    },

    handleInputValue: event => {
        /*
            Receives the input from the user, typed into the search bar
            and searches for matches on each Pokemon Card specifically.
        */
        const inputValue = event.target.value.toLowerCase()
        const cards = document.querySelectorAll('.card')

        cards.forEach(filterPokemonCards(inputValue))
    }
}