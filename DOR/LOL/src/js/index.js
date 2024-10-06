import Campeones from './Campeones.js';


let lista_champ = []

function loadpage(){

    const page = document.getElementById("mostrar_imagenes");
    
    for(let i = 0; i <lista_champ.length; i++){
        const champCard = document.createElement("div");
        champCard.classList.add("champ");
        //   pokemonCard.id = `pokemon-${pokemon.id}`;
        const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
        champCard.innerHTML = `
            <div class="cardChamp">
            ${lista_champ[i].name}
            <img src="${imageUrl}" alt="${lista_champ[i].name}" 
            <br>
            Historia: ${lista_champ[i].history}.<br>
            <div class="types">
            Tipo: ${lista_champ[i].tags}
            </div>`;

        page.appendChild(champCard);
   
    }

        





}

// `
//         <div class="cardTop">
//           <div class="attack">Attack ${pokemon.attack}</div>
//           <div class="price">${pokemon.price}€</div>
//         </div>   
//         <img src="${pokemon.pkm_back}">
//         <img class="front" src="${pokemon.pkm_front}"><br>
//         ${pokemon.id}. ${pokemon.name}<br>
//         Weight ${pokemon.weight}.<br>
//         <div class="types">
//           ${types}
//         </div>`;





const obtenerChamp = async () => {
    await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
        .then(function(result) {
            return result.json();
        })
        .then(function(result) {
            const champ_list = result.data; // Accedemos a la clave "data" que contiene los campeones
            console.log(champ_list);

            // Recorremos el objeto champ_list
            for (let champ in champ_list) {
                console.log(champ); // Aquí tienes el nombre del campeón
                console.log(champ_list[champ]); // Aquí tienes los detalles del campeón
                let nuevoChamp = new Campeones(champ_list[champ]);
                lista_champ.push(nuevoChamp);
                console.log(nuevoChamp);
            }
        });
        console.log(lista_champ)
        loadpage()
}


obtenerChamp()



// general_information
// : 
// {attack: 8, defense: 4, magic: 3, difficulty: 4}
// history
// : 
// "Aatrox y sus hermanos, otrora respetados defensores de Shurima contra el Vacío, acabarían convirtiéndose en una amenaza aún mayor para Runaterra y solo conocieron la derrota ante el uso astuto de hechizos mortales. No obstante, tras siglos de reclusión..."
// id
// : 
// "Aatrox"
// image
// : 
// {full: 'Aatrox.png', sprite: 'champion0.png', group: 'champion', x: 0, y: 0, …}
// name
// : 
// "Aatrox"
// partype
// : 
// "Pozo sangriento"
// stats
// : 
// {hp: 650, hpperlevel: 114, mp: 0, mpperlevel: 0, movespeed: 345, …}
// tags
// : 
// (2) ['Fighter', 'Tank']
// title
// : 
// "la Espada de los Oscuros"





