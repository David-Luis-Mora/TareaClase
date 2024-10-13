export default class Campeones {
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