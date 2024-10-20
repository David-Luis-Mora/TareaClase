// Import the functions you need from the SDKs you need
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
const db = getFirestore(app); // Inicializa Firestore

async function obtenerUsuario(id) {
  const docRef = doc(db, "Usuarios", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Datos del documento:", docSnap.data());
    return true;
  } else {
    console.log("No se encontró el documento");
    return false;
  }
}

async function getAllUsers() {
  const usuariosCol = collection(db, 'Usuarios'); // Referencia a la colección
  const snapshot = await getDocs(usuariosCol); // Obtiene todos los documentos en la colección
  const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea a un arreglo de objetos
  return userList;
}

async function agregarUsuario(registerUsername, name, apellidos, email, edad, ciudad, password) {
  const data = {
    nombreUsuario : registerUsername,
    nombre: name,
    apellidos: apellidos,
    email: email,
    edad: edad,
    ciudad : ciudad,
    password: password,
    favoritos: [],
    comprado: [],
  };

  await setDoc(doc(db, "Usuarios", `${email}`), data);
  console.log("Registro hecho");
}

const emailPattern = /.+@.+\..+/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function validateLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (username.length < 3) {
    alert("El nombre de usuario debe tener al menos 3 caracteres.");
    return false;
  }

  if (!passwordPattern.test(password)) {
    alert("La contraseña debe tener al menos 8 caracteres, incluir una letra, al menos una mayúscula, un símbolo y un número.");
    return false;
  }

  return true;
}

function validateRegister(name, apellidos, email, edad, password, confirmPassword) {
  if (name.length >= 10) {
    alert("El nombre es muy largo.");
    return false;
  }

  if (apellidos.length >= 40) {
    alert("La longitud del apellido es muy larga.");
    return false;
  }

  if (edad.length > 3) {
    alert("La longitud de la edad no es correcta.");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Por favor, introduce un correo electrónico válido.");
    return false;
  }

  if (!passwordPattern.test(password)) {
    alert("La contraseña debe tener al menos 8 caracteres, incluir una letra y un número.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  return true;
}

async function ckeck() {
  const registerUsername = document.getElementById("registerUsername").value;
  const name = document.getElementById("name").value;
  const apellidos = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const edad = document.getElementById("age").value;
  const ciudad = document.getElementById("city").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (validateRegister(name, apellidos, email, edad, password, confirmPassword)) {
    const usuarioExiste = await obtenerUsuario(email); // Espera el resultado

    if (!usuarioExiste) {
      await agregarUsuario(registerUsername, name, apellidos, email, edad, ciudad, password);
      alert("Registro exitoso");
    } else {
      alert("Ya el usuario está registrado");
    }
  } else {
    alert("Hay algún dato que está mal el formato");
  }
}



async function login(event) {
  event.preventDefault();
  if (validateLogin()) {
    console.log("Comprobar que el usuario existe");
    const allUsers = await getAllUsers();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    let correoUsuario = "";
    let count  = 0

    allUsers.forEach((element) => {
      if (element.nombreUsuario == username  && element.password == password) {
        count += 1
        console.log(`Nombre de Usuario: ${element.nombreUsuario}`);
        console.log(`Contraseña: ${element.password}`);
        correoUsuario = element
      }
    console.log()
    });

    if (count == 1){
      console.log("El usuario existe")

      const currentUrl = window.location.href;
      console.log(currentUrl)
      const rootUrl = window.location.protocol + "//" + window.location.host;
      console.log(rootUrl)
      const newUrl = rootUrl + '/DEW/Pokemons - MVC - Filtro - Botones/index.html';
      console.log(newUrl)

      window.open(newUrl, '_blank');
      console.log("Login aceptado");

     
      localStorage.setItem("correoUsuario", JSON.stringify(correoUsuario));
      console.log(correoUsuario)

    }else{
      alert("El nombre de usuario o la contraseña no existe")
    }

    console.log("Todos los usuarios");
    console.log(allUsers);

  } else {
    alert("Por favor, completa los datos correctamente.");
  }
}

function register(event) {
  event.preventDefault();
  ckeck();
}

// function login(){
//   const registerUsername = document.getElementById("loginUsername").value;
//   const name = document.getElementById("name").value;

// }

const v_login = document.getElementById("btonLogin");
v_login.addEventListener("click", login);

const v_register = document.getElementById("btn_register");
v_register.addEventListener("click", register);





// Ideas para la siguiente parte

// function login() {
//   if (validateLogin()) {
//     const username = document.getElementById("loginUsername").value;
//     // Aquí puedes comprobar si el usuario existe en tu base de datos
//     obtenerUsuario(username).then(existe => {
//       if (existe) {
//         // Abre una nueva pestaña con la URL deseada
//         window.open('pagina-despues-login.html', '_blank'); // Cambia 'pagina-despues-login.html' por tu archivo HTML
//         console.log("Login aceptado");
//       } else {
//         alert("El usuario no existe");
//       }
//     });
//   } else {
//     alert("Por favor, completa los datos correctamente.");
//   }
// }



// En pagina-despues-login.html
// const urlParams = new URLSearchParams(window.location.search);
// const username = urlParams.get('user');
// console.log("Usuario logueado:", username);



// function login() {
//   if (validateLogin()) {
//     const username = document.getElementById("loginUsername").value;

//     obtenerUsuario(username).then(existe => {
//       if (existe) {
//         // Guarda la URL actual en una variable
//         const currentUrl = window.location.href;

//         // Abre una nueva pestaña con la URL deseada
//         window.open('pagina-despues-login.html?referrer=' + encodeURIComponent(currentUrl), '_blank');

//         console.log("Login aceptado");
//       } else {
//         alert("El usuario no existe");
//       }
//     });
//   } else {
//     alert("Por favor, completa los datos correctamente.");
//   }
// }




