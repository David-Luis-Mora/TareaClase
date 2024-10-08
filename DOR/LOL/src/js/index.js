import Campeones from './Campeones.js';


let lista_champ = []
let cantidad = 0
let page_count = 1

function loadpage(estate){
    console.log(estate);
    if (estate == 0){
        console.log("Load incial")
        const page = document.getElementById("mostrar_imagenes");
        let count = 0;
        for(let i = 0; i <lista_champ.length; i++){
            if( count == 8 ){
                break;
            }else{
                count +=1
            }
            // console.log(lista_champ[i].tags.length)

            let type_1 = "";
            let type_2 = "";
            
            if(lista_champ[i].tags.length == 2){
                type_1 = lista_champ[i].tags[0]
                type_2 = lista_champ[i].tags[1]
                // console.log(tip_1);
                // console.log(tip_2);

            }else{
                type_1 = lista_champ[i].tags[0]
                // console.log(tip_1);
            }

            
            const champCard = document.createElement("div");
            champCard.classList.add("champ");
            //   pokemonCard.id = `pokemon-${pokemon.id}`;
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
            champCard.innerHTML = `
                <div class="cardChamp">
                    <p>${lista_champ[i].name}</p>
                <img src="${imageUrl}" alt="${lista_champ[i].name}">
                <br>
                <div class="types">
                Type: ${type_1}  ${type_2} 
                </div>
                </div>`;

            page.appendChild(champCard);

        }
        

    } else if(estate == 1){
        page_count += 1
        if(page_count > cantidad){
            return true;
        }
        // console.log("boton derecho")
        const page = document.getElementById("mostrar_imagenes");
        page.innerHTML=""

        // console.log(lista_champ.length);

        for(let i = 0; i <lista_champ.length; i++){
                if((page_count*8)-8<= i && i <(page_count*8)){
                    let type_1 = "";
                    let type_2 = "";

                    if(lista_champ[i].tags.length == 2){
                        type_1 = lista_champ[i].tags[0]
                        type_2 = lista_champ[i].tags[1]
                        // console.log(tip_1);
                        // console.log(tip_2);

                    }else{
                        type_1 = lista_champ[i].tags[0]
                        // console.log(tip_1);
                    }

                    const champCard = document.createElement("div");
                    champCard.classList.add("champ");
                    //   pokemonCard.id = `pokemon-${pokemon.id}`;
                    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
                    champCard.innerHTML = `
                        <div class="cardChamp">
                            <p>${lista_champ[i].name}</p>
                        <img src="${imageUrl}" alt="${lista_champ[i].name}"
                        <br>
                        <div class="types">
                            Type: ${type_1}  ${type_2} 
                        </div>`;
                    page.appendChild(champCard);
                }


            }
       

        

    }else{
        if(page_count <= 1){
            // console.log(page_count)
            return true;
        }
        page_count -= 1
        // console.log(page_count)
    
    
        const page = document.getElementById("mostrar_imagenes");
        page.innerHTML=""
    
        // console.log(lista_champ.length);
    
        for(let i = 0; i < lista_champ.length; i++){
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
        console.log("Pagina Inical")
        loadpage(0)
}


obtenerChamp()


const btonDerech = document.getElementById("btonDerech");
btonDerech.addEventListener("click", function(){
    loadpage(1)
})


const btonIzquierd = document.getElementById("btonIzquierd")
btonIzquierd.addEventListener("click", function(){
    loadpage(-1)

} )







