import Campeones from './Campeones.js';

let lista_champ = [];
let cantidad = 0;
let page_count = 1;
let skinIndex = 0;


async function getChampionDetails(championId) {
    const url = `https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion/${championId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data[championId];
}


function showPopup(name, imageUrl, tags, infor_general, id) {
    const page = document.getElementById("card-grid");
    const popup = document.getElementById("championModal");
    const previousContent = page.innerHTML;


    document.getElementById("btonIzquierd").style.visibility = "hidden";
    document.getElementById("btonDerech").style.visibility = "hidden";

    page.removeAttribute("id");
    page.classList.add("championModal");

    let nombre_mayuscula = name.toUpperCase();

    page.innerHTML = `
        <button id="close"><img src="./img/x.png"></button>
        <h2 id="namepop">${nombre_mayuscula}</h2>
        <button id="prev"><img  src="./img/flecha1.png"></button>
        <img id="champion-image" id="champion-image" src="${imageUrl}" alt="${name}">
        <button id="next"><img src="./img/flecha.png"></button>
        <p>${infor_general}</p>
    `;

    popup.classList.add("show");

    document.getElementById("close").addEventListener("click", function() {
        popup.classList.remove("show");
        page.innerHTML = previousContent;
        page.id = "card-grid";
        page.classList.remove("championModal");

        document.getElementById("btonIzquierd").style.visibility = "visible";
        document.getElementById("btonDerech").style.visibility = "visible";

        const all_cards = document.querySelectorAll('.card');
        
        all_cards.forEach((card, index) => {
            let cambiado = true;
            card.addEventListener('click', function() {
                console.log("Esto en el bucle")
                if(cambiado){
                    if(page_count != 1){
                        cambiado = false
                        index = ((page_count * 8) -8) + index
                        console.log("Entro por el if")
                    }else{
                        cambiado = false
    
                    }

                }
               
                console.log(index,page_count)
                showPopup(lista_champ[index].name, 
                          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[index].id}_0.jpg`,
                          lista_champ[index].tags,
                          lista_champ[index].history, lista_champ[index].id);
            });
        });
    });

    getChampionDetails(id).then(championDetails => {
        const skins = championDetails.skins;
        const totalSkins = skins.length;

        document.getElementById("prev").addEventListener("click", function() {
            skinIndex = (skinIndex - 1 + totalSkins) % totalSkins;
            const skin = skins[skinIndex];
            const newImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`;
            document.getElementById("champion-image").src = newImageUrl;
        });

        document.getElementById("next").addEventListener("click", function() {
            skinIndex = (skinIndex + 1) % totalSkins;
            const skin = skins[skinIndex];
            const newImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`;
            document.getElementById("champion-image").src = newImageUrl;
        });
    });
}


function loadpage() {
    const page = document.getElementById("card-grid");
    page.innerHTML = "";

    let startIndex = (page_count - 1) * 8;
    let endIndex = Math.min(startIndex + 8, lista_champ.length);

    for (let i = startIndex; i < endIndex; i++) {
        let formato_text = lista_champ[i].tags.join("/");
        let nombre_mayuscula = lista_champ[i].name.toUpperCase();
        const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${lista_champ[i].image.full}`;
        let imag_full = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[i].id}_0.jpg`;

        const champCard = document.createElement("div");
        champCard.classList.add("card");
        champCard.innerHTML = `
            <h2>${nombre_mayuscula}</h2>
            <img src="${imageUrl}" alt="${lista_champ[i].name}">
            <p>TYPE</p>
            <p>${formato_text}</p>
        `;

        champCard.addEventListener("click", function() {
            showPopup(lista_champ[i].name, imag_full, lista_champ[i].tags, lista_champ[i].history, lista_champ[i].id);
        });

        page.appendChild(champCard);
    }
}

const obtenerChamp = async () => {
    await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
        .then(result => result.json())
        .then(result => {
            const champ_list = result.data;
            for (let champ in champ_list) {
                let nuevoChamp = new Campeones(champ_list[champ]);
                lista_champ.push(nuevoChamp);
            }
        });

    cantidad = Math.ceil(lista_champ.length / 8);
    loadpage();
}

obtenerChamp();

document.getElementById("btonDerech").addEventListener("click", function() {
    if (page_count < cantidad) {
        page_count++;
        loadpage();
    }
});

document.getElementById("btonIzquierd").addEventListener("click", function() {
    if (page_count > 1) {
        page_count--;
        loadpage();
    }
});
