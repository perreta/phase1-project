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
    let img = document.createElement('img')
    let removeButton = document.createElement('button')

    divContainer.className = 'pokemon-card'
    divFrame.className = 'pokemon-frame'
    divImage.className = 'pokemon-image'
    h1.className = 'center-text'
    h1.textContent = capitalizeFirstLetter(pokemon.name)
    img.src = pokemon.sprites.front_default
    removeButton.textContent = 'X'

    removeButton.addEventListener('click', (e) => {
      e.target.parentElement.innerHTML = ''
    })
  
    divImage.append(img)
    divFrame.append(h1, divImage)
    divContainer.append(divFrame, removeButton)
    document.querySelector('#pokemon-container').append(divContainer)

    //CLICKING ON A POKEMON FOR MORE DETAIL
    divFrame.addEventListener('click',() => {
      document.getElementById('pokemon-container').innerHTML='';
      renderSinglePokemon(pokemon);
      console.log(pokemon)
      document.querySelector('.center-text').textContent = '#' + pokemon.id + ' ' + (capitalizeFirstLetter(pokemon.name))
      
      let divHeight = document.createElement('div')
      let divWeight = document.createElement('div')
      let imgBack = document.createElement('img')
      let h2Height = document.createElement('h2')
      let h2Weight = document.createElement('h2')

      imgBack.src = pokemon.sprites.back_default
      h2Height.textContent = 'Height: ' + pokemon.height
      h2Weight.textContent = 'Weight: ' + pokemon.weight

      document.querySelector('.pokemon-image').append(imgBack)
      document.querySelector('.pokemon-frame').append(h2Height, h2Weight)

      //BRINGING BACK THE THE FULL RENDERING
      document.querySelector('.pokemon-card').addEventListener('click', ()=>{
        document.getElementById('pokemon-container').innerHTML=''
        fetchAllPokemon()
      })
    })
  
    
  }
  
// GET All------------------------------------------------------
  function fetchAllPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i<data.results.length; i++){
      fetch(data.results[i].url)
      .then(response => response.json())
      .then(data => {
        renderSinglePokemon(data)
        }
      )}
    })}
        

  //GET One
  //Should take an id as a parameter 
  //Should make Get request Fetching a single animal from our json-server
  //Should handle a promise
  //Should render that pokemon to the page and remove the other pokemon