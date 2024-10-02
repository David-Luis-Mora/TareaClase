import Song, {play_song} from './Song.js'

export default class Player{
    constructor(map){
        // Object.entries(map);
        let aux = 1;
        for(var[key,value] of Object.entries(map)){
            const s_key = key;
            const s_value = value;
            const s_conver = `.cv${aux}`
            const song = new Song(s_key,s_value,s_conver);
            play_song(song);
            aux++;
        }
    }
}