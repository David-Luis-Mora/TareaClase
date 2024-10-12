import Campeones from './Campeones.js';

let lista_champ = [];
let cantidad = 0;
let page_count = 1;

function showPopup(name, imageUrl, tags, infor_general) {
    const page = document.getElementById("card-grid");
    const popup = document.getElementById("championModal");
    const prueba = document.getElementsByClassName("container");
    const previousContent = page.innerHTML;
    console.log(prueba)

    page.removeAttribute("id");
    page.classList.add("championModal");

    let nombre_mayuscula = name.toUpperCase();

    // Oculta los botones
    document.getElementById("btonIzquierd").style.visibility = "hidden";
    document.getElementById("btonDerech").style.visibility = "hidden";

    page.innerHTML = `
        <button id="close"><img src="./img/x.png"></button>
        <h2 id="namepop">${nombre_mayuscula}</h2>
        <button id="prev"><img src="./img/flecha1.png"></button>
        <img src="${imageUrl}" alt="${name}">
        <button id="next"><img src="./img/flecha.png"></button>
        <p>${infor_general}</p>
    `;

    popup.classList.add("show");

    document.getElementById("close").addEventListener("click", function() {
        popup.classList.remove("show");
        
        
        page.innerHTML = previousContent;
        page.id = "card-grid"; // Restaurar ID
        page.classList.remove("championModal")
        // let conter = document.getElementById("championModal")
        // console.log(conter)
        // conter.classList.remove("championModal")
        // let conter_2 = document.getElementsByClassName("championModal")
        // conter_2.innerHTML = conter

        // Restaura la visibilidad de los botones
        document.getElementById("btonIzquierd").style.visibility = "visible";
        document.getElementById("btonDerech").style.visibility = "visible";

        const all_cards = document.querySelectorAll('.card');
        all_cards.forEach((card, index) => {
            card.addEventListener('click', function() {
                showPopup(lista_champ[index].name, 
                          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[index].id}_0.jpg`,
                          lista_champ[index].tags,
                          lista_champ[index].history);
            });
        });



    });

    document.getElementById("btonDerech").addEventListener("click", function() {

        const page = document.getElementById("card-grid");
        num_page =

        if(page_count){
            return true;
        }
        
        // popup.classList.remove("show");
        
        
        // page.innerHTML = previousContent;
        // page.id = "card-grid"; // Restaurar ID
        // page.classList.remove("championModal")
        // // let conter = document.getElementById("championModal")
        // // console.log(conter)
        // // conter.classList.remove("championModal")
        // // let conter_2 = document.getElementsByClassName("championModal")
        // // conter_2.innerHTML = conter

        // // Restaura la visibilidad de los botones
        // document.getElementById("btonIzquierd").style.visibility = "visible";
        // document.getElementById("btonDerech").style.visibility = "visible";

        // const all_cards = document.querySelectorAll('.card');
        // all_cards.forEach((card, index) => {
        //     card.addEventListener('click', function() {
        //         showPopup(lista_champ[index].name, 
        //                   `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lista_champ[index].id}_0.jpg`,
        //                   lista_champ[index].tags,
        //                   lista_champ[index].history);
        //     });
        // });



    });





        
        // const all_card = document.getElementsByClassName('card');

        // for (let i = 0; i < all_card.length; i++) {
        //     elementos[i].addEventListener('click', showPopup )

        // }
        //     });

        
        // }
    
}
function loadpage(estate) {
    const page = document.getElementById("card-grid");
    page.innerHTML = ""; // Limpiar contenido antes de cargar nuevas cartas

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
            showPopup(lista_champ[i].name, imag_full, lista_champ[i].tags, lista_champ[i].history);
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
    loadpage(1); // Carga la primera página de campeones
}

obtenerChamp();

document.getElementById("btonDerech").addEventListener("click", function() {
    if (page_count < cantidad) {
        page_count++;
        loadpage(page_count);
    }
});

document.getElementById("btonIzquierd").addEventListener("click", function() {
    if (page_count > 1) {
        page_count--;
        loadpage(page_count);
    }
});
