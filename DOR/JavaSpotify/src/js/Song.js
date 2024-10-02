
export default class Song{
    constructor(k_song,v_song,c_song){
        
        this.element = document.querySelector(k_song);
        this.audio = new Audio(v_song);
        this.album = document.querySelector(c_song);
    }
}

export function play_song(song){
    console.log(song)
    song.element.onclick = () => {
        if (song.audio.paused) {
            song.audio.play();
            // song.element.classList.add('playing'); // Opcional: añade una clase para indicar que está reproduciendo
        } else {
            song.audio.pause();
            // song.element.classList.remove('playing'); // Opcional: quita la clase si se pausa
        }
    }
}