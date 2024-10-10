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
   appId: "1:887503594687:web:12672a053bf4d36e55d20a"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);



import { getFirestore, collection, doc, addDoc , getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const db = getFirestore(app); // Inicializa Firestore



function prueba(){
  console.log("Desde conexion")

}



