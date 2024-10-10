import Campeones from './Campeones.js';

let lista_champ = [];
let cantidad = 0;
let page_count = 1;

function showPopup(name, imageUrl, tags, infor_general) {
    console.log("Pop-up")
    const popup = document.getElementById("popup");
    console.log(imageUrl)
    popup.innerHTML = `
        <div class="popup-content">
            <h2>${name}</h2>
            <button id="botnIzPop"><</button>
            <div>
                <img src="${imageUrl}" alt="${name}">
            </div>
            
            <button id="botnDrPop">></button>
                ${infor_general}
            <p>Typs: ${tags}</p>
            <button id="closePopup">Cerrar</button>
        </div>`;
        
    popup.style.display = "flex";
    // popup.classList.add("show")

    document.getElementById("closePopup").addEventListener("click", function() {
        popup.style.display = "none";
        // popup.classList.remove("show")
    });

    document.getElementById("botnDrPop").addEventListener("click", function(){

        const popupImage = document.querySelector('.popup-content img');
        let imageUrl = popupImage.getAttribute('src');

        const regex = /_(\d+)\.jpg$/;
        const match = imageUrl.match(regex);
    
        if (match) {
            let currentNumber = parseInt(match[1], 10);
            console.log("Número actual:", currentNumber);
    
            let newNumber = currentNumber + 1;
            console.log("Nuevo número:", newNumber);
    
            let newImageUrl = imageUrl.replace(regex, `_${newNumber}.jpg`);

            let img = new Image();
            img.src = newImageUrl;

            img.onload = function() {

                popupImage.setAttribute('src', newImageUrl);
                console.log("Imagen actualizada: ", newImageUrl);
            };
            
            img.onerror = function() {

                console.log("Imagen no encontrada:", newImageUrl);
                alert("Imagen no encontrada, manteniendo la imagen actual.");
            };


        } else {
            console.log("No se encontró un número en la URL.");
        }



    })
    document.getElementById("botnIzPop").addEventListener("click", function(){

        const popupImage = document.querySelector('.popup-content img');
        let imageUrl = popupImage.getAttribute('src');

        const regex = /_(\d+)\.jpg$/;
        const match = imageUrl.match(regex);
    
        if (match) {
            let currentNumber = parseInt(match[1], 10);
            console.log("Número actual:", currentNumber);

            let newNumber = currentNumber - 1;
            console.log("Nuevo número:", newNumber);

            let newImageUrl = imageUrl.replace(regex, `_${newNumber}.jpg`);

            let img = new Image();
            img.src = newImageUrl;

            img.onload = function() {

                popupImage.setAttribute('src', newImageUrl);
                console.log("Imagen actualizada: ", newImageUrl);
            };
            
            img.onerror = function() {

                console.log("Imagen no encontrada:", newImageUrl);
                alert("Imagen no encontrada, manteniendo la imagen actual.");
            };
            

        } else {
            console.log("No se encontró un número en la URL.");
        }




    });
};





function loadpage(estate){
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
            const champCard = document.createElement("div");
            champCard.classList.add("champ");

            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
            console.log(imageUrl)
            champCard.innerHTML = `
                <div class="cardChamp">
                    <p>${lista_champ[i].name}</p>
                <div>
                    <img src="${imageUrl}" alt="${lista_champ[i].name}">
                </div>
                <br>
                <div class="types">
                    <p>Types</p>
                    <p>${lista_champ[i].tags}</p>
                </div>
                </div>`;
            
            let imag_full = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[i].id}_0.jpg`
            // console.log(imag_full)

            

            



            champCard.addEventListener("click", function() {
                showPopup(lista_champ[i].name, imag_full, lista_champ[i].tags, lista_champ[i].history);
            });


            page.appendChild(champCard);
        }

    } else if(estate == 1){
        if(page_count >= cantidad){
            return true;
        }
        page_count += 1
        const page = document.getElementById("mostrar_imagenes");
        page.innerHTML=""

        for(let i = 0; i <lista_champ.length; i++){
            if((page_count*8)-8<= i && i <(page_count*8)){
                const champCard = document.createElement("div");
                champCard.classList.add("champ");
               
                const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
                
                champCard.innerHTML = `
                    <div class="cardChamp">
                        <p>${lista_champ[i].name}</p>
                    <img src="${imageUrl}" alt="${lista_champ[i].name}"
                    <br>
                    <div class="types">
                        Typs: ${lista_champ[i].tags}
                    </div>`;

                // champCard.addEventListener("click", function() {
                //     showPopup(lista_champ[i].name, imageUrl, lista_champ[i].tags);
                // });

                let imag_full = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[i].id}_0.jpg`
                console.log(imag_full)

                champCard.addEventListener("click", function() {
                    showPopup(lista_champ[i].name, imag_full, lista_champ[i].tags, lista_champ[i].history);
                });
                    
                page.appendChild(champCard);
            };
        };
    }else{
        if(page_count <= 1){
            return true;
        }
        page_count -= 1
        console.log(page_count)
        const page = document.getElementById("mostrar_imagenes");
        page.innerHTML=""    
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
                    <div class="types">
                    Typs: ${lista_champ[i].tags}
                    </div>`;

                // champCard.addEventListener("click", function() {
                //     showPopup(lista_champ[i].name, imageUrl, lista_champ[i].tags);
                // });

                let imag_full = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[i].id}_0.jpg`


                champCard.addEventListener("click", function() {
                    showPopup(lista_champ[i].name, imag_full, lista_champ[i].tags, lista_champ[i].history);
                });

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
            const champ_list = result.data;

            for (let champ in champ_list) {
                let nuevoChamp = new Campeones(champ_list[champ]);
                lista_champ.push(nuevoChamp);
            }
        });

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













