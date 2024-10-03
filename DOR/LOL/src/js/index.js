import Campeones from './Campeones.js';


let lista_champ = []

const obtenerChamp = async () =>{
        await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
            .then(function(result) {
                return result.json();
            }).then(function(result) {
                const champ_list = result;
                console.log(champ_list)
                for(let i = 1;i < champ_list.length ; i++){
                    console.log(champ_list)
                    // let champ = new Campeones(data.data[i])
                    // lista_champ.push(champ)
                    // console.log(champ)
                }
                
            });
       

        
}


const startPokedex = async () => {
    // Bucle for que itera desde 1 hasta 151, que son los primeros 151 Pokemon
        // Utilizamos fetch para hacer una solicitud a la API donde i representa el número de Pokemon
        await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
            .then(function(result) {
                return result.json();
            // Convertimos la respuesta de la API en un objeto JSON
            }).then(function(result) {
                const data = result;
                console.log(data)
                // const pokemon = new Pokemon (data);
                // pushPokemon(pokemon);
                //Guardamos el resultado en data y creamos una nueva instancia de Pokemon con los datos obtenidos
                // almacenamos los resultados en el array
               // console.log(pokemon);
            });
    // Una vez que todos los Pokemon se han añadido al array, llamamos a la función showPokedex
    // await showPokedex();
};

// startPokedex()






obtenerChamp()

