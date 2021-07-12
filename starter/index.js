//Will run callback after dom has loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchAllPokemon()
  })
  
//Render ------------------------------------------------------------
  function renderSinglePokemon(pokemon){
    let divContainer = document.createElement('div')
    let divFrame = document.createElement('div')
    let divImage = document.createElement('div')
    let h1 = document.createElement('h1')
    let img = document.createElement('img')

    divContainer.className = 'pokemon-card'
    divFrame.className = 'pokemon-frame'
    divImage.className = 'pokemon-image'
    h1.className = 'center-text'
    h1.textContent = pokemon.name 
    img.src = pokemon.sprites.front

    divImage.append(img)
    divFrame.append(h1, divImage)
    divContainer.append(divFrame)

    divContainer.addEventListener('click',() => showPokemon(pokemon.id))
  
    document.querySelector('#pokemon-container').append(divContainer)
  }
  
  //
  function fetchAllPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(resp => resp.json())
      .then(data => data.forEach(renderSinglePokemon))
}
    //Should Fetch all pokemon from our json-server 
    //Should handle a promise
    //Should render the return data to the page



// Example Project:
// - Render a collection of cards to the DOM (you'll have to make a GET request to an api to create this list of cards)
// - The card objects are kept in an array for easy access
// - Render each card to the DOM in a list
// - Render a form
// - The form should create a new card on submit and add it to the cards array
// - Clicking the card should render two buttons next to the card, one for edit one for delete
// - Clicking the Edit button will allow you to edit the card using the form and update it on the DOM and in the card array
// - Clicking the delete will remove the card from the DOM and from the card array