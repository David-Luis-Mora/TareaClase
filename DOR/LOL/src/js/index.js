import Campeones from './Campeones.js';


let lista_champ = []
let cantidad = 0
let page_count = 1

function loadpage(){

    const page = document.getElementById("mostrar_imagenes");

    // console.log(lista_champ.length);
    
    for(let i = 0; i <lista_champ.length; i++){
            const champCard = document.createElement("div");
            champCard.classList.add("champ");
            //   pokemonCard.id = `pokemon-${pokemon.id}`;
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
            champCard.innerHTML = `
                <div class="cardChamp">
                    <p>${lista_champ[i].name}</p>
                <img src="${imageUrl}" alt="${lista_champ[i].name}" 
                <br>
                <p>Historia: ${lista_champ[i].history}.</p>
                <div class="types">
                Tipo: ${lista_champ[i].tags}
                </div>`;

            page.appendChild(champCard);

        }


}






const obtenerChamp = async () => {
    await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
        .then(function(result) {
            return result.json();
        })
        .then(function(result) {
            const champ_list = result.data; // Accedemos a la clave "data" que contiene los campeones
            // console.log(champ_list);

            // Recorremos el objeto champ_list
            for (let champ in champ_list) {
                // console.log(champ); // Aquí tienes el nombre del campeón
                // console.log(champ_list[champ]); // Aquí tienes los detalles del campeón
                let nuevoChamp = new Campeones(champ_list[champ]);
                lista_champ.push(nuevoChamp);
                // console.log(nuevoChamp);
            }
        });
        // console.log(lista_champ)
        cantidad = Math.ceil(lista_champ.length / 8);
        

        loadpage()
}


obtenerChamp()


// Comprobar si funciona
function botonDerecho(){
    console.log(cantidad)
    console.log(page_count)
    page_count += 1
    if(page_count > cantidad){
        return true;
    }
    console.log("boton derecho")
    const page = document.getElementById("mostrar_imagenes");
    page.innerHTML=""

    // console.log(lista_champ.length);
    
    for(let i = 0; i <lista_champ.length; i++){
            if((page_count*8)-8<= i && i <(page_count*8)){

                const champCard = document.createElement("div");
                champCard.classList.add("champ");
                //   pokemonCard.id = `pokemon-${pokemon.id}`;
                const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
                champCard.innerHTML = `
                    <div class="cardChamp">
                        <p>${lista_champ[i].name}</p>
                    <img src="${imageUrl}" alt="${lista_champ[i].name}" 
                    <br>
                    <p>Historia: ${lista_champ[i].history}.</p>
                    <div class="types">
                    Tipo: ${lista_champ[i].tags}
                    </div>`;
                page.appendChild(champCard);
            }
            

        }

}



function botonIzquierda(){
    console.log("boton izquierdo")


}


const btonDerech = document.getElementById("btonDerech");
btonDerech.addEventListener("click", botonDerecho )


const btonIzquierd = document.getElementById("btonIzquierd")
btonIzquierd.addEventListener("click", botonIzquierda)







