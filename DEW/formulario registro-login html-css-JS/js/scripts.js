// import conexion from './conexion.js'

// Ejecutar esto primero antes de ver la pagina
// npm install -g live-server
// live-server

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  sett,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const db = getFirestore(app); // Inicializa Firestore

async function obtenerUsuario(id) {
  const docRef = doc(db, "Usuarios", id); // Reemplaza "0" con el ID correcto del documento
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Datos del documento:", docSnap.data());
  } else {
    console.log("No se encontró el documento");
  }
}

async function agregarUsuario(name, apellidos, edad, email, password) {
  const data = {
    nombre: name,
    apellidos: apellidos,
    edad: edad,
    email: email,
    password: password,
  };

  await setDoc(doc(db, "Usuarios", `${email}`), data);
  // try {
  //   const docRef = await sett(doc(db, "Usuarios", `${email}`), {});

  //   console.log("Documento agregado con ID: ", docRef.id);
  //   console.log((name, apellidos, edad, email, password));
  // } catch (e) {
  //   console.error("Error agregando documento: ", e);
  // }
}

// Expresión regular para validar email
const emailPattern = /.+@.+\..+/;

// Expresión regular de contraseña que acepte al menos una letra mayúscula,
// un número, un símbolo y una longitud mínima de 8 caracteres
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/;

function validateLogin() {
  prueba();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value; // Limito longitud del campo
  if (username.length >= 10) {
    alert("El nombre de usuario debe tener al menos 3 caracteres.");
    return false;
  }

  // Compruebo el formato mínimo de la contraseña
  if (!passwordPattern.test(password)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, incluir una letra, al menos una mayúscula, un símbolo y un número."
    );
    return false;
  }

  return true;
}

function validateRegister() {
  console.log("Validar registro");
  // const name = document.getElementById("name").value;
  // const apellidos = document.getElementById("fullName").value;
  // const email = document.getElementById("email").value;
  // const edad = document.getElementById("age").value;
  // const password = document.getElementById("registerPassword").value;
  // const confirmPassword = document.getElementById("confirmPassword").value;

  // Limito longitud del campo name
  // if (name.length >= 10) {
  //   alert("El nombre es muy largo.");
  //   return false;
  // }

  // // Limito longitud del campo apellidos
  // if (apellidos.length >= 40) {
  //   alert("La longitud del apellido es muy larga.");
  //   return false;
  // }

  // // Limito longitud del campo edad
  // if (edad.length == 2) {
  //   alert("La longitud de la edad no es correcta.");
  //   return false;
  // }

  // // Compruebo el formato del correo
  // if (!emailPattern.test(email)) {
  //   alert("Por favor, introduce un correo electrónico válido.");
  //   return false;
  // }

  // // Compruebo el formato mínimo de la contraseña
  // if (!passwordPattern.test(password)) {
  //   alert(
  //     "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número."
  //   );
  //   return false;
  // }

  // // Confirmo que ha escrito correctamente la contraseña
  // if (password !== confirmPassword) {
  //   alert("Las contraseñas no coinciden.");
  //   return false;
  // }
  // console.log("Agregaria el usuario")
  // agregarUsuario(name,apellidos,edad,email,password)
  // setTimeout(() => {
  //   // console.clear(); // Limpia la consola después de un segundo
  // }, 1000000000);

  return true;
}

async function obtenerDocumento() {
  const docRef = doc(db, "lista", "0"); // Reemplaza "0" con el ID correcto del documento
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Datos del documento:", docSnap.data());
  } else {
    console.log("No se encontró el documento");
  }
}

function prueba() {
  console.log("Verificacion de registro");
  const registerUsername = document.getElementById("registerUsername").value; // Este es el campo que buscas
  const apellidos = document.getElementById("fullName").value; // Asegúrate de que el id sea correcto
  const email = document.getElementById("email").value;
  const edad = document.getElementById("age").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (obtenerUsuario())
    agregarUsuario(registerUsername, apellidos, edad, email, password);
}

function login() {
  // if(validateLogin()){
  //   // obtenerDocumento();
  //   console.log("Login hecho")

  // }else{
  //   alert("El usuario no existe")
  // }
  console.log("Login hecho");
  if (validateLogin) {
    console.log("Login aceptado");
    let a = "b";
    obtenerUsuario(a);
  }
}

function register() {
  event.preventDefault();
  console.log("Registro hecho");
  prueba();
  // if(validateRegister){
  //   console.log("El registro es valido")
  //   agregarUsuario()

  // }
}

const v_login = document.getElementById("btonLogin");
v_login.addEventListener("click", login);

const v_register = document.getElementById("btn_register");
v_register.addEventListener("click", register);
