const pokemonEnergy = {
  bug: 'img/bugEnergy.png',
  dark: 'img/darkEnergy.png',
  dragon: 'img/dragonEnergy.png',
  electric: 'img/electrEnergy.png',
  fairy: 'img/fairyEnergy.png',
  fighting: 'img/fightEnergy.png',
  fire: 'img/fireEnergy.png',
  flying: 'img/flyingEnergy.png',
  ghost: 'img/ghostEnergy.png',
  grass: 'img/grassEnergy.png',
  ground: 'img/groundEnergy.png',
  ice: 'img/iceEnergy.png',
  normal: 'img/normalEnergy.png',
  poison: 'img/poisonEnergy.png',
  psychic: 'img/psyEnergy.png',
  rock: 'img/rockEnergy.png',
  steel: 'img/steelEnergy.png',
  water: 'img/waterEnergy.png',
};



function getRandomSpriteURL(pokemonNumber) {
  const versions = {
    'generation-iii': ['emerald', 'firered-leafgreen', 'ruby-sapphire'],
    'generation-iv': ['diamond-pearl', 'heartgold-soulsilver', 'platinum'],
    'generation-v': ['black-white'],
    'generation-vi': ['x-y', 'omegaruby-alphasapphire'],
    'generation-vii': ['ultra-sun-ultra-moon'],
  };

  const generationKeys = Object.keys(versions);
  const randomGenerationKey = generationKeys[Math.floor(Math.random() * generationKeys.length)];
  const randomGeneration = versions[randomGenerationKey];

  const randomVersion = randomGeneration[Math.floor(Math.random() * randomGeneration.length)];

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/${randomGenerationKey}/${randomVersion}/${pokemonNumber}.png`;
}

document.addEventListener("DOMContentLoaded", function () {
  const getPokemon = (e) => {
    const getname = document.querySelector("#pokemonName").value;
    const name = getname.toLowerCase();
    const image = document.querySelector("#imagepokemon");
    const namepokemon = document.querySelector("#namepokemon");
    const number = document.querySelector("#Number");
    const weight = document.querySelector("#weight");
    const type = document.querySelector("#type");
    const energy = document.querySelector("#energy");
    const height = document.querySelector("#height");


    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
      .then((response) => response.json())
      .then((frenchData) => {
        const frenchName = frenchData.name;
        namepokemon.textContent = frenchName.charAt(0).toUpperCase() + frenchName.slice(1);

        fetch(`https://pokeapi.co/api/v2/pokemon/${frenchData.id}`)
          .then((response) => response.json())
          .then((data) => {
            image.src = `${data.sprites.other['official-artwork'].front_default}`;
            image.alt = `${data.name}`;
            number.textContent = `Numéro: ${data.id}`;
            weight.textContent = `Poids: ${Math.round(data.weight/ 10)} kg`;
            height.textContent = `Taille: ${data.height * 10} cm`;
            type.innerHTML = `pouvoir: ${data.types[0].type.name}`;
          });
      })
      .catch((err) => {
        alert('Pokemon non trouvé', err);
      });

    e.preventDefault();
  };

  document.querySelector('#search').addEventListener("click", getPokemon);
  let input = document.getElementById("pokemonName");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getPokemon();
    }
  });
});