// Exportamos por defecto la clase Pokemon
export default class Campeones {
    // Constructor que recibe como parámetro data que contiene los datos de los Pokemon que obtenemos desde la API
    constructor(data) {
        this.name = data.name;                          
        this.id = data.id;                              
        this.history = data.blurb;      
        this.general_information= data.info;
        this.image = data.image;
        this.tags = data.tags;
        this.stats = data.stats;
        this.partype = data.partype;
        this.title = data.title
    }
}

// blurb
// : 
// "Una joven testaruda y llena de vida de la clase trabajadora de Zaun. Zeri canaliza su magia eléctrica para cargarse a sí misma y su fusil personalizado. Su volátil poder canaliza sus emociones, y sus chispas se inspiran en su veloz estilo de vida..."
// id
// : 
// "Zeri"
// image
// : 
// {full: 'Zeri.png', sprite: 'champion5.png', group: 'champion', x: 0, y: 48, …}
// info
// : 
// {attack: 8, defense: 5, magic: 3, difficulty: 6}
// key
// : 
// "221"
// name
// : 
// "Zeri"
// partype
// : 
// "Maná"
// stats
// : 
// {hp: 630, hpperlevel: 110, mp: 250, mpperlevel: 45, movespeed: 335, …}
// tags
// : 
// ['Marksman']
// title
// : 
// "La Chispa de Zaun"
// version
// : 
// "13.18.1"