document.addEventListener('DOMContentLoaded', () => {
  fetchAllPokemon()
  document.querySelector('#pokedex-logo').addEventListener('click', (e) => {
    document.getElementById('pokemon-container').innerHTML='';
    fetchAllPokemon()    
  })
  document.querySelector('#notes-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let addNote = document.querySelector("#note-input")
    let liNote = document.createElement("li")
    liNote.textContent = addNote.value
    let ulNoteAdd = document.querySelector("ul")
    ulNoteAdd.appendChild(liNote)
    addNote.value = ""
  })
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
  let pokemonContainer = document.getElementById('pokemon-container')
  let empty = []

  divContainer.classList = 'pokemon-card'
  divContainer.id = `${pokemon.id}`
  divFrame.className = 'pokemon-frame'
  divImage.className = 'pokemon-image'
  h1.className = 'center-text'
  h2Type.classList = 'type-class'
  removeButton.className = 'remove-button'
  caughtButton.className = 'caught-button'
  favoriteButton.className = 'favorite-button'

  h1.textContent = capitalizeFirstLetter(pokemon.name)
  img.src = pokemon.sprites.front_default
  removeButton.textContent = 'X'
  caughtButton.type = 'image'
  favoriteButton.type = 'image'
  
  caughtButton.src = 'images/emptyPokeballWhite.png'
  favoriteButton.src = 'images/emptyStarWhite.png'
  favoriteButton.id = 'favorite-empty'

  //ADDING TYPES
  if(pokemon.types[1]){
    h2Type.textContent = 'Type: ' + capitalizeFirstLetter(pokemon.types[0].type.name) + ' & ' + capitalizeFirstLetter(pokemon.types[1].type.name)
    h2Type.classList = pokemon.types[0].type.name + ' ' + pokemon.types[1].type.name + ' ' + 'all'
  }
  else{
    h2Type.textContent = 'Type: ' + capitalizeFirstLetter(pokemon.types[0].type.name)
    h2Type.classList = pokemon.types[0].type.name + ' ' + 'all'
  }

  //FILTER TYPES
  document.querySelector('#type-dropdown').addEventListener('change', (e) =>{
    if (h2Type.classList.contains(`${e.target.value}`)){h2Type.parentElement.parentElement.classList = 'pokemon-card'
  }else{
      h2Type.parentElement.parentElement.classList = 'hidden'}
  })

  //CAUGHT BUTTON
  caughtButton.addEventListener('click', (e) => { 
    caughtButton.src = 'images/fillPokeballWhite.png'
    e.stopPropagation()
  })

  //FAVORITE BUTTON
  favoriteButton.addEventListener('click', (e) => { 
    console.log(e.target)
      if (e.target.id === 'favorite-empty'){
        e.target.src = 'images/fillStarWhite.png'
        e.target.id = 'favorite-fill'
      } else {
        e.target.src = 'images/emptyStarWhite.png'
        e.target.id = 'favorite-empty' 
      }
    e.stopPropagation()
  })

  //POPULATING CARD
  divImage.append(img)
  divFrame.append(removeButton, h1, divImage, h2Type, favoriteButton, caughtButton)
  divContainer.append(divFrame)
  document.querySelector('#pokemon-container').append(divContainer)

  //ORDER POKEMON BY ID
  empty.map.call(pokemonContainer.children, Object ).sort(function (a,b) {
    return +a.id.match( /\d+/ ) - +b.id.match( /\d+/ );
  }).forEach(function (elem) {
    pokemonContainer.appendChild(elem);
  });

  //REMOVE BUTTON
  removeButton.addEventListener('click', (e) => {
    console.log(e.target)
    e.target.parentElement.parentElement.remove()
    e.stopPropagation()
  })

  //CLICKING ON A POKEMON FOR MORE DETAIL
  divContainer.addEventListener('click', (e) => {
    document.getElementById('pokemon-container').children.classList = 'hidden'
    document.getElementById('pokemon-container').innerHTML='';
    renderSinglePokemon(pokemon);
    console.log(pokemon)
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
    divHeight.append(h2Height)
    divWeight.append(h2Weight)
    document.querySelector('.pokemon-frame').append(divFullImage, h2Type, divHeight, divWeight, favoriteButton, caughtButton)
    
    //BRINGING BACK THE THE FULL RENDERING
    document.querySelector('.pokemon-card').addEventListener('click', ()=>{
      document.getElementById('pokemon-container').innerHTML=''
      fetchAllPokemon()
    })
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