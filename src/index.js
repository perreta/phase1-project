document.addEventListener('DOMContentLoaded', () => {
  fetchAllPokemon()
})

  // CAPITALIZE FIRST LETTER
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
};

  // RENDERING ALL POKEMON -----------------------------------------------------------
  function renderSinglePokemon(pokemon){
    let divContainer = document.createElement('div')
    let divFrame = document.createElement('div')
    let divImage = document.createElement('div')
    let h1 = document.createElement('h1')
    let h2Type = document.createElement('h2')
    let img = document.createElement('img')
    let removeButton = document.createElement('button')
    let caughtButton = document.createElement('input')
    let favoriteButton = document.createElement('input')

    divContainer.className = 'pokemon-card'
    divFrame.className = 'pokemon-frame'
    divImage.className = 'pokemon-image'
    h1.className = 'center-text'
    h2Type.className = 'type-class'
    removeButton.className = 'remove-button'
    caughtButton.className = 'caught-button'
    favoriteButton.className = 'favorite-button'

    h1.textContent = capitalizeFirstLetter(pokemon.name)
    img.src = pokemon.sprites.front_default
    removeButton.textContent = 'X'
    caughtButton.type = 'image'
    favoriteButton.type = 'image'
    
    caughtButton.src = 'images/emptyPokeball.png'
    favoriteButton.src = 'images/emptyStar.png'

    //ADDING TYPES
    if(pokemon.types[1]){
      h2Type.textContent = 'Type: ' + capitalizeFirstLetter(pokemon.types[0].type.name) + ' & ' + capitalizeFirstLetter(pokemon.types[1].type.name)
    }
    else{
      h2Type.textContent = 'Type: ' + capitalizeFirstLetter(pokemon.types[0].type.name)
    }

    //CAUGHT BUTTON
    caughtButton.addEventListener('click', (e) => { 
      caughtButton.src = 'images/fillPokeball.png'
      e.stopPropagation()
    })

    //FAVORITE BUTTON
    favoriteButton.addEventListener('click', (e) => { 
        favoriteButton.src = 'images/fillStar.png'
        e.stopPropagation()
    })

    //POPULATING CARD
    divImage.append(img)
    divFrame.append(removeButton, h1, divImage, h2Type, favoriteButton, caughtButton)
    divContainer.append(divFrame)
    document.querySelector('#pokemon-container').append(divContainer)

    //REMOVE BUTTON
    removeButton.addEventListener('click', (e) => {
      e.target.parentElement.remove()
      //e.target.parentElement.innerHTML = ''
      e.stopPropagation()
    })
    //TRYING NOTES OUTSIDE
    let divNotes = document.createElement('div')
      let formNotes = document.createElement('form')
      let inputNotes = document.createElement('input')
      let submitNotes = document.createElement('submit')
      let addNotes = document.createElement('ul')
      inputNotes.id = "inputNotes"
      inputNotes.placeholder = "Notes..."
      inputNotes.style.width = "100px"
      // inputNotes.addEventListener('onKeyPress', (e) => {
      //   // inputNotes.text = inputNotes.value
      //   e.stopPropogation()
      // })
      submitNotes.textContent = "Add Notes"
      submitNotes.addEventListener('submit', (e) => {
        e.preventDefault()
        addNotes.textContent = inputNotes.value
      })
      divNotes.append(formNotes, addNotes, inputNotes, submitNotes) 
    //CLICKING ON A POKEMON FOR MORE DETAIL
    divFrame.addEventListener('click',(e) => {
      document.getElementById('pokemon-container').innerHTML='';
      renderSinglePokemon(pokemon);
      // console.log(pokemon)
      document.querySelector('.center-text').textContent = '#' + pokemon.id + ' ' + (capitalizeFirstLetter(pokemon.name))
      
      let divHeight = document.createElement('div')
      let divWeight = document.createElement('div')
      let divFullImage = document.createElement('div')
      let imgBack = document.createElement('img')
      let h2Height = document.createElement('h2')
      let h2Weight = document.createElement('h2')

      divFullImage.className = 'full-pokemon-image'
      
      imgBack.src = pokemon.sprites.back_default
      h2Height.textContent = 'Height: ' + pokemon.height
      h2Weight.textContent = 'Weight: ' + pokemon.weight    

      document.querySelector('.pokemon-image').remove()
      document.querySelector('h2').remove()
      document.querySelector('.caught-button').remove()
      document.querySelector('.favorite-button').remove()
      divFullImage.append(img, imgBack)
      
      //ADD NOTES SECTION TRYING INSIDE RENDER SINGLE POKEMON INFO
      // let divNotes = document.createElement('div')
      // let formNotes = document.createElement('form')
      // let inputNotes = document.createElement('input')
      // let submitNotes = document.createElement('submit')
      // let addNotes = document.createElement('ul')
      // inputNotes.id = "inputNotes"
      // inputNotes.placeholder = "Notes..."
      // inputNotes.style.width = "100px"
      // // inputNotes.addEventListener('onKeyPress', (e) => {
      // //   // inputNotes.text = inputNotes.value
      // //   e.stopPropogation()
      // // })
      // submitNotes.textContent = "Add Notes"
      // submitNotes.addEventListener('submit', (e) => {
      //   e.preventDefault()
      //   addNotes.textContent = inputNotes.text
  
      // })
      // divNotes.append(formNotes, addNotes, inputNotes, submitNotes) 

      document.querySelector('.pokemon-frame').append(divFullImage, h2Type, h2Height, h2Weight, favoriteButton, caughtButton, divNotes) //divNotes 
    
      //BRINGING BACK THE THE FULL RENDERING
      document.querySelector('.pokemon-card').addEventListener('click', ()=>{
        document.getElementById('pokemon-container').innerHTML=''
        fetchAllPokemon()
      })
      document.querySelector('#pokemon-logo').addEventListener('click', ()=>{
        document.getElementById('pokemon-container').innerHTML=''
        fetchAllPokemon()
      })

      //DROPDOWN EVENT LISTENER IN PROGRESS - MORE UP TO DATE IN MAIN BRANCH
      // document.querySelector('#type-dropdown').addEventListener('change', (e) =>{
      //   if (h2Type.classList.contains(e.target.value)){}
      //   else{h2Type.parentElement.parentElement.remove()}
      // })
    })
  
    
  }
  
// GET All------------------------------------------------------
function fetchAllPokemon(){
  for (let i = 1; i <= 151; ++i){
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(response => response.json())
    .then(data => {
    renderSinglePokemon(data)
  })
}
}
        

  //GET One
  //Should take an id as a parameter 
  //Should make Get request Fetching a single animal from our json-server
  //Should handle a promise
  //Should render that pokemon to the page and remove the other pokemon