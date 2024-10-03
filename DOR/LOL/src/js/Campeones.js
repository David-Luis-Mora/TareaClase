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

    }
}