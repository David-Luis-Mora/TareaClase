// PokemonController.js
import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";
export class PokemonController {
  constructor() {
    this.model = new PokemonModel();
    this.view = new PokemonView();
    

    this.pokemonsFiltered = [];
    this.newDesireList = [];

    // Bind button event
    document
      .querySelector("button")
      .addEventListener("click", () => this.init());
  }
  async init() {
    this.view.showLoading();
    try {
      await this.model.loadPokemons();
      this.view.hideLoading();
      this.view.showConsole();
      this.view.displayPokemons(this.model.getAllPokemons());
      this.bindingEvents();
    } catch (error) {
      console.error(error);
    }
  }
  async bindingEvents() {
    // Bind input filterType
    this.filterType = document.querySelector("#filtroTipo");
    this.filterType.addEventListener("keyup", () => this.filteringPokemons());

    this.filterWeight = document.querySelector("#filtroPeso");
    this.filterWeight.addEventListener("keyup", () => this.filteringPokemons());

    this.filterStats = document.querySelector("#filtroPoderTotal");
    this.filterStats.addEventListener("keyup", () => this.filteringPokemons());


    // Bind Añadir a Lista de deseos
    document
      .querySelector("#btnAgnadeListaDeseo")
      .addEventListener("click", this.mostrarListaDeseo.bind(this));

    // Bind Cards pokemons
    this.cardPokemons = document.querySelectorAll(".card");
    this.cardPokemons.forEach((card) => {

      card.addEventListener("click", () =>{
        let esta = false;
        let elemnt = card.id.split("-")
        let num = elemnt[1]

        for(let i= 0; i < this.newDesireList.length; i++){
          if(this.model.pokemons[i].id == num)
            console.log("Ya existia en la lista")
            esta = true
          break;
        }

        if(esta == false){
          console.log("No existe en la lista")
          for(let i= 0; i < this.model.pokemons.length; i++){
            if(this.model.pokemons[i].id == num)
              console.log("Encontro")
              this.pokemonsClicked(this.model.pokemons[i].name,this.model.pokemons[i].price)
              card.classList.add("section")

            break;
          }

        }else{

        }

      

      })
    });
  }

  pokemonsClicked(name,price) {
    this.newDesireList.push([name,price]);
    console.log(name)
    console.log(`${price}`)
  }

  async filteringPokemons() {
    this.pokemonsFiltered = [];
    let weight = this.filterWeight.value
    let stats = this.filterStats.value;


    this.model.pokemons.forEach((pkm) => {
      this.safePokemon = false;
      if(isNaN(weight)){
        weight = 0
      }else{
        weight = parseFloat(weight)
      }

      if(isNaN(stats)){
        stats = 0
      }else{
        stats = parseFloat(stats)

      }

      console.log(parseFloat(weight),parseFloat(stats))

      if (pkm.pkm_type[0].type.name.includes(this.filterType.value)&& pkm.weight >= weight && pkm.attack >= stats){
        this.safePokemon = true;
      } else if (
        pkm.pkm_type.length > 1 &&
        pkm.pkm_type[1].type.name.includes(this.filterType.value)&& pkm.weight >= weight && pkm.attack >= stats){
        this.safePokemon = true;
      }
      if (this.safePokemon) {
        this.pokemonsFiltered.push(pkm);
      }
      
    });
    this.view.displayPokemons(this.pokemonsFiltered);
  }

  // async filteringPokemons() {
  //   this.pokemonsFiltered = [];
  //   this.model.pokemons.forEach((pkm) => {
  //     this.safePokemon = false;

  //     if (pkm.pkm_type[0].type.name.includes(this.filterType.value)) {
  //       this.safePokemon = true;
  //     } else if (
  //       pkm.pkm_type.length > 1 &&
  //       pkm.pkm_type[1].type.name.includes(this.filterType.value)
  //     ) {
  //       this.safePokemon = true;
  //     }
  //     if (this.safePokemon) {
  //       this.pokemonsFiltered.push(pkm);
  //     }
  //   });
  //   this.view.displayPokemons(this.pokemonsFiltered);
  // }

  mostrarListaDeseo() {
    //console.log(this.newDesireList);
    let txt = "¿Quieres añadir los siguientes Pokemons a la Lista de Deseo?";
    this.newDesireList.forEach((pkm) => {
      txt = txt + " " + pkm;
    });

    if (window.confirm(txt)) {
      // ToDo Guardar en BBDD
      console.log("Guardando nueva lista de deseo...");
    } else if (window.confirm("¿Quieres deseleccionar los pokemons?")) {
      // ToDo desmarcar pokemons

      this.newDesireList = [];
    }
  }
}


// Ideas
// // Abrimos una nueva pestaña
// const nuevaPestana = window.open('', '_blank');

// // Verificamos si la pestaña se abrió correctamente
// if (nuevaPestana) {
//     // Cambiamos el título de la nueva pestaña
//     nuevaPestana.document.title = "Nueva Pestaña Dinámica";

//     // Escribimos contenido dentro de la nueva pestaña
//     nuevaPestana.document.body.innerHTML = `
//         <h1>Bienvenido a la nueva pestaña</h1>
//         <p>Este es un contenido dinámico generado con JavaScript.</p>
//         <p>Correo del usuario: <strong id="correoUsuario"></strong></p>
//         <button id="botonCerrar">Cerrar Pestaña</button>
//     `;

//     // Añadimos funcionalidad para mostrar el correo almacenado en localStorage
//     const correoUsuario = localStorage.getItem("correoUsuario");
//     if (correoUsuario) {
//         nuevaPestana.document.getElementById("correoUsuario").textContent = correoUsuario;
//     }

//     // Añadimos un botón para cerrar la nueva pestaña
//     nuevaPestana.document.getElementById("botonCerrar").addEventListener("click", function() {
//         nuevaPestana.close();
//     });
// } else {
//     // Si la pestaña no se pudo abrir, mostramos un mensaje de error en la consola
//     console.error("No se pudo abrir la nueva pestaña. Verifica los permisos del navegador.");
// }

