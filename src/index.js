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
     
    img.src = pokemon.sprites.front_default
  
    divImage.append(img)
    divFrame.append(h1, divImage)
    divContainer.append(divFrame)

    //divContainer.addEventListener('click',() => {})
  
    document.querySelector('#pokemon-container').append(divContainer)
  }
  
//GET Requests ------------------------------------------------------
  //GET All
  function fetchAllPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i<data.results.length; i++){
      fetch(data.results[i].url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        renderSinglePokemon(data)
        }
      )}
    })}
        
//Should Fetch all pokemon from our json-server
//Should handle a promise
//Should render the return data to the page 

  //GET One
  //Should take an id as a parameter 
  //Should make Get request Fetching a single animal from our json-server
  //Should handle a promise
  //Should render that pokemon to the page and remove the other pokemon