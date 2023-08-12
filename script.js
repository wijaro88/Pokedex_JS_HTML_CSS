const carousel = document.querySelector(".carousel");

let numItems=0;
let currentItem = 0;
let pokemonDataArray=[];
function loadPokemonData() {
     fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      pokemonDataArray = data;
      numItems = pokemonDataArray.length;

      // console.log(data);
      showPokemonDetails(currentItem);
      handleSearch();
      
    })
    .catch (error => console.error('error fetching JSON:', error));
}
function showPokemonDetails(index) {
  // console.log(imagesData);
  carousel.innerHTML = "";
  for (let index = 0; index < numItems; index++) {
    // console.log(element);
    const li = document.createElement("li");
    const img = document.createElement("img");
    const name = document.createElement("h5")
    const numberpk = document.createElement("h4");
    img.src = pokemonDataArray[index].ThumbnailImage;
    img.alt = pokemonDataArray[index].ThumbnailAltText;
    name.textContent=pokemonDataArray[index].name;
    numberpk.textContent = pokemonDataArray[index].number;
    li.appendChild(name);
    li.appendChild(img);
    carousel.appendChild(li);

    img.addEventListener("click", ()=> showModal(index));
  }
}
  function showItem(index) {
      carousel.style.transform = `translateX(-${index* 300}px)`;
    }
  function nextItem() {
    currentItem = (currentItem + 1) % numItems;
    showItem(currentItem);
  }
  function prevItem() {
    currentItem = (currentItem - 1 + numItems) % numItems;
    showItem(currentItem);
  }

  function showModal(index) {
    const modal = document.getElementById("pokemonModal");
    const modalName = document.getElementById("modalName");
    const modalImage = document.getElementById("modalImage");
    
    const modalType = document.getElementById("modalType");
    const modalAbilities = document.getElementById("modalAbilities");
    const modalHeight = document.getElementById("modalHeight");
    const modalWeight = document.getElementById("modalWeight");
    const modalWeakness = document.getElementById("modalWeakness");
    const pokemon = pokemonDataArray[index];

    modalName.textContent = pokemonDataArray[index].name;
    modalImage.src = pokemonDataArray[index].ThumbnailImage;
    modalImage.alt = pokemonDataArray[index].ThumbnailAltText;
    
    modalName.textContent = pokemon.name;
    modalType.textContent = "Type: " + pokemon.type.join(", ");
    modalAbilities.textContent = "Abilities: " + pokemon.abilities.join(", ");
    modalHeight.textContent = "Height: " + pokemon.height + " decimetres";
    modalWeight.textContent = "Weight: " + pokemon.weight + " hectograms";
    modalWeakness.textContent = "Weakness: " + pokemon.weakness.join(", ");
    
    modal.style.display = "block";
  }

  function handleSearch() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();


    if (searchInput===""){
      showPokemonDetails(currentItem);
      return;
    }
    const matchingPokemons = pokemonDataArray.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(searchInput) ||
        pokemon.number.toString() === searchInput
      );
    });
    if(matchingPokemons.length >0 ){
      showPokemonDetails(matchingPokemons[0].index)
    }else{
      alert("pokemon not found");
    }
    // const foundPokemonIndex = pokemonDataArray.findIndex((pokemon) => {
  //       pokemon.name.toLowerCase() === searchInput ||
  //       pokemon.number === searchInput
  //     return (

  //     );
  //   });
  
  //   if (foundPokemonIndex !== -1) {
  //     showPokemonDetails(foundPokemonIndex);
  //   } else {
  //     alert("Pokémon not found.");
  //   }
  }
  
  // Add an event listener to the search input box
  document.getElementById("searchInput").addEventListener("input", handleSearch);
  

    document.querySelector(".close").addEventListener("click", () => {
    const modal = document.getElementById("pokemonModal");
    modal.style.display = "none";
  });




  loadPokemonData();
  document.querySelector("#btn-next").addEventListener("click", nextItem);
  document.querySelector("#btn-prev").addEventListener("click", prevItem);


