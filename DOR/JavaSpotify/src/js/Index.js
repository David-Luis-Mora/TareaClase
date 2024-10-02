import songs from '../assets/songs/*.mp3';
import Player from './Player.js';
// /home/daw/Escritorio/TareaClase/TareaClase/DOR/JavaSpotify/src/assets/songs


Object.keys(songs);




const map = {};



let aux = 1;

for(var key of Object.keys(songs)){
    // console.log( Object.keys(songs));
    map[`item-${aux}`] = `${songs[key]}`;
    aux++;

}

console.log(map)

const player = new Player(map)

