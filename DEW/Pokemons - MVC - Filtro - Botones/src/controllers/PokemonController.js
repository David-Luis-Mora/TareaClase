// PokemonController.js
import { PokemonModel } from "../models/PokemonModel.js";
import { PokemonView } from "../views/PokemonView.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV9d4KTlk3-75SZ7dWUvDj4InxZ_QuKCc",
  authDomain: "compra-pokemon-86250.firebaseapp.com",
  projectId: "compra-pokemon-86250",
  storageBucket: "compra-pokemon-86250.appspot.com",
  messagingSenderId: "887503594687",
  appId: "1:887503594687:web:12672a053bf4d36e55d20a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 


async function agregarUsuario(registerUsername, name, apellidos, email, edad, ciudad, password,favoritos,comprado) {
  const data = {
    nombreUsuario : registerUsername,
    nombre: name,
    apellidos: apellidos,
    email: email,
    edad: edad,
    ciudad : ciudad,
    password: password,
    favoritos: favoritos,
    comprado: comprado,
  };

  await setDoc(doc(db, "Usuarios", `${email}`), data);
  console.log("Registro hecho");
}





function enviarDatos(){
  let storedUser = localStorage.getItem("correoUsuario");
  console.log(JSON.parse(storedUser))
  let users = JSON.parse(storedUser)
  agregarUsuario(users.nombreUsuario,users.nombre,users.apellidos,users.email,users.edad,users.ciudad,users.password,users.favoritos,users.comprado)

  

}



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
      .addEventListener("click", this.añadirListaDeseo.bind(this));

    document
      .querySelector("#btnComprar")
      .addEventListener("click", this.añadirListaCompra.bind(this));

    document
      .querySelector("#btnVerLista")
      .addEventListener("click", this.verListaDeseo.bind(this));

    document.querySelector("#btnVerCompra")
    .addEventListener("click", this.verListaCompra.bind(this));

    // Bind Cards pokemons
    this.cardPokemons = document.querySelectorAll(".card");
    this.cardPokemons.forEach((card) => {

      card.addEventListener("click", () =>{

        let esta = false;
        let elemnt = card.id.split("-")
        let num = parseFloat(elemnt[1])
        for(let i= 0; i < this.newDesireList.length; i++){
          console.log(this.newDesireList[i].id)
          console.log(typeof(num));
          if(this.newDesireList[i].id == num){
            esta = true
          }
        
        }
        if(esta == false){
          for(let i= 0; i < this.model.pokemons.length; i++){
            if(this.model.pokemons[i].id == num){
              // console.log("Encontro")
              this.pokemonsClicked(this.model.pokemons[i].id,this.model.pokemons[i].name,this.model.pokemons[i].price)
              card.classList.add("section")
            }
          }
        }else{
          let aux = 0
          for(let i= 0; i < this.newDesireList.length; i++){
            if(this.newDesireList[i].id == num){
              console.log("Ya existia en la lista")
              card.classList.remove("section")
              aux = i
            }
          }
          this.newDesireList.splice(aux,1);         
        }

      

      })
    });
  }

  

  pokemonsClicked(id,name,price) {
    this.newDesireList.push({"id":id,"name":name,"price":price});
    console.log(name)
    // console.log(`${price}`)
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

  actualizarCartas(){
  
  }

  añadirListaDeseo() {
    let storedUser = localStorage.getItem("correoUsuario");
    let users = JSON.parse(storedUser)
    console.log(users)
    let index = []

    for (let i = 0; i < this.newDesireList.length; i++) {
      for (let j = 0; j < users.favoritos.length; j++) {
        console.log(users.favoritos[j])
        let registro = users.favoritos[j];
        let claves = Object.keys(registro).length;
        for(let k =0; k < claves ; k++){
          console.log(users.favoritos[j][k].id)
          console.log(this.newDesireList[i].id)
          if( users.favoritos[j][k].id == this.newDesireList[i].id ){
            console.log("No se va añadir el pokemon")
            index.push(i)
          }
        }
      }
    }

    let key = {}
    let count = 0;
    for(let i = 0; i <  this.newDesireList.length; i++){
      if (!index.includes(i)){
        console.log("Se ha añadido el pokemoen en la lista")
        key[count] = this.newDesireList[i]
        count += 1;
      }
    }
    console.log((Object.keys(key)))
    if(Object.keys(key).length > 0){
      console.log(key)
      users.favoritos.push(key)
      localStorage.setItem("correoUsuario", JSON.stringify(users));
      enviarDatos()
      this.newDesireList = []
      this.cardPokemons.forEach((card) => {
        card.classList.remove("section")
      });
      // actualizarCartas()
    }
    else{
      console.log("No se ha añadido el pokemon")
    }

  }
  añadirListaCompra(){
    console.log("Funciona")
    let storedUser = localStorage.getItem("correoUsuario");
    let users = JSON.parse(storedUser)

    let key = {}
    let count = 0;

    for(let i = 0; i <  this.newDesireList.length; i++){
      console.log("Se ha añadido el pokemoen en la lista")
      key[count] = this.newDesireList[i]
      count += 1;
    }
    if(Object.keys(key).length > 0){
      console.log(key)
      users.comprado.push(key)
      localStorage.setItem("correoUsuario", JSON.stringify(users));
      enviarDatos()
      this.newDesireList = []
      this.cardPokemons.forEach((card) => {
        card.classList.remove("section")
      });
      // actualizarCartas()
    }
    else{
      console.log("No se ha añadido el pokemon")
    }
  }





  verListaDeseo() {
    console.log("Funciona");
    let storedUser = localStorage.getItem("correoUsuario");
    let users = JSON.parse(storedUser);
  
    console.log(users.favoritos);
  
    let nuevaVentana = window.open("", "_blank");
  
    let tablaHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="tabla-contenedor">`;
  
    for (let j = 0; j < users.favoritos.length; j++) {
      let registro = users.favoritos[j];
      let claves = Object.keys(registro).length;
      for (let k = 0; k < claves; k++) {
        if (users.favoritos[j][k]) { // Verifica que el elemento exista
          tablaHTML += `
          <tr>
            <td>${users.favoritos[j][k].id}</td>
            <td>${users.favoritos[j][k].name}</td>
            <td>${users.favoritos[j][k].price}</td>
            <td><button class="borrar-btn" id="${users.favoritos[j][k].id}">Borrar</button></td>
          </tr>`;
        }
      }
    }
  
    tablaHTML += `
        </tbody>
      </table>`;
  
    nuevaVentana.document.write(`
      <html>
        <head>
          <title>Tabla Dinámica</title>
        </head>
        <body>
          <h1>Lista de Favoritos</h1>
          <div id="tabla-contenedor">
            ${tablaHTML}
          </div>
          <script>
            function generarTablaHTML(users) {
              let tablaHTML =
              \`<table border="1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody id="tabla-contenedor">\`
              for (let j = 0; j < users.favoritos.length; j++) {
                let registro = users.favoritos[j];
                let claves = Object.keys(registro).length;
                for (let k = 0; k < claves; k++) {
                  tablaHTML += \`
                  <tr>
                    <td>\${users.favoritos[j][k].id}</td>
                    <td>\${users.favoritos[j][k].name}</td>
                    <td>\${users.favoritos[j][k].price}</td>
                    <td><button class="borrar-btn" id="\${users.favoritos[j][k].id}">Borrar</button></td>
                  </tr>\`;
                }
              }
              tablaHTML += \`
                </tbody>
              </table>;\`
              document.body.innerHTML = ""
              document.body.innerHTML =\`
                 <html>
                    <head>
                      <title>Tabla Dinámica</title>
                    </head>
                    <body>
                      <h1>Lista de Favoritos</h1>
                      <div id="tabla-contenedor">
                        ${tablaHTML}
                      </div>
                    </body>
                  </html>
              
              \`
              //return tablaHTML;
            }
  
            function actualizarTabla() {
              let storedUser = localStorage.getItem("correoUsuario");
              let users = JSON.parse(storedUser);
              let nuevaTabla = generarTablaHTML(users);
              document.getElementById('tabla-contenedor').innerHTML = nuevaTabla;
              borrarRegistro();
            }
  
            function borrarRegistro() {
              document.querySelectorAll('.borrar-btn').forEach(button => {
                button.addEventListener('click', function() {
                  let ident = parseFloat(this.getAttribute('id'));
                  let storedUser = localStorage.getItem("correoUsuario");
                  let users = JSON.parse(storedUser);
                  let pos = 0;
                  let clave_aux = 0;
                  //console.log(users.favoritos)
                  
                  for (let j = 0; j < users.favoritos.length; j++) {
                    for (let clave in users.favoritos[j]) {
                      if (users.favoritos[j][clave] && users.favoritos[j][clave].id == ident) {
                        pos = j;
                        clave_aux = clave;
                      }
                    }
                  }
                  
                  delete users.favoritos.splice(pos, 1);

                  // let key = {}
                  // let key_aux = {}
                  // let count = 0;
                  // for(let i = 0; i <  users.favoritos.length; i++){
                  //   let registro = users.favoritos[i];
                  //   let claves = Object.keys(registro).length;
                  //   let valor =  Object.values(registro).length
                  //   if( claves.length == valor.length){
                  //     console.log("El registro no tiene hueco")
                  //     key[count] = users.favoritos[i]
                  //     count += 1;
                  //     console.log("Se ha añadido el pokemon en la lista")

                  //   }else{
                  //     let count_2 = 0 
                  //     for(let k  in value){
                  //       key_aux[count_2] = users.favoritos[i][k]
                  //     }
                  //     key[count] = key_aux
                  //     count += 1;
                  //     console.log("Se ha añadido el pokemon en la lista, habia un hueco")
                  //   }
                  // }
                  console.log(users.favoritos)
                  //users.favoritos = []
                  //users.favoritos.push(key)                  
                  localStorage.setItem("correoUsuario", JSON.stringify(users));
                  //actualizarTabla();
                });
              });
            }
  
            borrarRegistro();
          </script>
        </body>
      </html>
    `);
    nuevaVentana.document.close();

    nuevaVentana.addEventListener('beforeunload', function () {
      console.log("He cerrado la pagina");
  
      // Lógica a ejecutar al cerrar la ventana
      storedUser = localStorage.getItem("correoUsuario");
      users = JSON.parse(storedUser);
      agregarUsuario(
        users.nombreUsuario,
        users.nombre,
        users.apellidos,
        users.email,
        users.edad,
        users.ciudad,
        users.password,
        users.favoritos,
        users.comprado
      );
    });


    // console.log("He cerrado la pagina")
    // storedUser = localStorage.getItem("correoUsuario");
    // users = JSON.parse(storedUser)
    // agregarUsuario(users.nombreUsuario,
    //   users.nombre,users.apellidos,users.
    //   email,users.edad,users.ciudad,users.password,users.favoritos,
    //   users.comprado)

  }
  
  





  // verListaDeseo(){
  //   console.log("Funciona")
  //   let storedUser = localStorage.getItem("correoUsuario");
  //   let users = JSON.parse(storedUser)

  //   console.log(users)
    

  //   let nuevaVentana = window.open("", "_blank");

  //   let tablaHTML = `
  //     <table border="1">
  //       <thead>
  //         <tr>
  //           <th>ID</th>
  //           <th>Name</th>
  //           <th>Precio</th>
  //         </tr>
  //       </thead>
  //       <tbody>`;


  //   for (let j = 0; j < users.favoritos.length; j++) {
  //     let registro = users.favoritos[j];
  //     let claves = Object.keys(registro).length;
  //     for(let k =0; k < claves ; k++){
  //       console.log(users.favoritos[j][k].id)
  //       console.log(users.favoritos[j][k].name)
  //       console.log(users.favoritos[j][k].price)
  //       tablaHTML += `
  //       <tr>
  //         <td>${users.favoritos[j][k].id}</td>
  //         <td>${ users.favoritos[j][k].name}</td>
  //         <td>${ users.favoritos[j][k].price}</td>
  //         <td><button class="borrar-btn" id="${users.favoritos[j][k].id}">Borrar</button></td>
  //       </tr>`;
  //     };
  //   }

  //   tablaHTML += `
  //       </tbody>
  //     </table>`;

  //   nuevaVentana.document.write(`
  //     <html>
  //       <head>
  //         <title>Tabla Dinámica</title>
  //       </head>
  //       <body>
  //         <h1>Lista de Favoritos</h1>
  //         ${tablaHTML}
  //         <script>

  //           function actualizarTabla() {
  //             let tablaHTML = window.opener.generarTablaHTML(window.opener.users);
  //             document.getElementById('tabla-contenedor').innerHTML = tablaHTML;

  //             // Reasignar los eventos a los botones nuevamente
  //             borrarRegistro;
  //           }

  //           function borrarRegistro(){
  //             document.querySelectorAll('.borrar-btn').forEach(button => {
  //               button.addEventListener('click', function() {
  //                 let ident = parseFloat(this.getAttribute('id'));
  //                 let storedUser = localStorage.getItem("correoUsuario");
  //                 let users = JSON.parse(storedUser);
  //                 let index = []
  //                 pos  = 0
  //                 clave_aux = 0
  //                 for (let j = 0; j < users.favoritos.length; j++) {
  //                   for (let clave in  users.favoritos[j]) {
  //                     if( users.favoritos[j][clave].id == ident){
  //                       console.log("Se encontro el pokemon")
  //                       pos = j
  //                       clave_aux = clave
  //                     }
  //                   }
  //                 }
  //                 console.log(users)
  //                 for (let j = 0; j < users.favoritos.length; j++){
  //                   delete users.favoritos[pos][clave_aux]
  //                 }
  //                 console.log(users)
  //                 //localStorage.setItem("correoUsuario", JSON.stringify(users));
  //                 actualizarTabla()
  //               });
  //             });
  //           }
  //           borrarRegistro()
  //         </script>
  //       </body>
  //     </html>
  //   `);

  //   nuevaVentana.document.close();

   
      
          



  // }
  verListaCompra(){
    console.log("Funciona")
    let storedUser = localStorage.getItem("correoUsuario");
    let users = JSON.parse(storedUser)

    console.log(users)

    let nuevaVentana = window.open("", "_blank");

    let tablaHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>`;


    for (let j = 0; j < users.comprado.length; j++) {
      let registro = users.comprado[j];
      let claves = Object.keys(registro).length;
      for(let k =0; k < claves ; k++){
        console.log(users.comprado[j][k].id)
        console.log(users.comprado[j][k].name)
        console.log(users.comprado[j][k].price)
        tablaHTML += `
        <tr>
          <td>${users.comprado[j][k].id}</td>
          <td>${ users.comprado[j][k].name}</td>
          <td>${ users.comprado[j][k].price}</td>
        </tr>`;
      };
    }

  

    tablaHTML += `
        </tbody>
      </table>`;

    nuevaVentana.document.write(`
      <html>
        <head>
          <title>Tabla Dinámica</title>
        </head>
        <body>
          <h1>Pokemon comprado</h1>
          ${tablaHTML}
        </body>
      </html>
    `);

    nuevaVentana.document.close();
    

  }

  
}








