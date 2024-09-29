
// Ejercicio 1
function comprobarCaracter(){

    event.preventDefault();

    let texto = document.getElementById("texto").value;

    let caracter = document.getElementById("caracter").value;

    let cantidad = texto.split(caracter).length -1;

    console.log(cantidad);

    let mostrar = document.getElementById("cantidadCaracter");

    mostrar.innerHTML = `${cantidad}`;

}

// Ejercicio 2
function sumarYMedia(primerArg, ...otrosArgs) {

    let suma = 0;
    let count = 0;

    if (primerArg === undefined) {
        console.error("Error: Se requiere al menos un argumento.");
        return;
    }

    function esNumero(valor) {
        if (typeof(valor) === "number" && !isNaN(valor)){
            return true
        }else{
            return false
        }
    }

    if (esNumero(primerArg)) {
        suma += primerArg;
        count++;
    } else {
        console.warn(`¡AVISO! El argumento número 1 "${primerArg}" no es un número, lo ignoramos.`);
    }

    for(var i=0; i < otrosArgs.length ; i++){

        if ( esNumero(otrosArgs[i])){
            suma += otrosArgs[i];
            count++;
        }else{
            console.warn(`¡AVISO! El argumento número ${i + 2}, ${otrosArgs[i]}  no es un número, lo ignoramos.`);

        }

    }

    let promedio = suma / count;
    console.log(`Suma: ${suma}, Promedio: ${promedio}`);
}


sumarYMedia(10, 10, "Hola", 10, 10, false, 10);


// Ejercicio 3

function sumar(num1, num2) {

    const suma = num1 + num2;

    console.log("Resultado de la suma:", suma);
    console.log("Resultado de la suma: " + suma);
    console.log("Resultado de la suma: %d", suma);
    console.log(`Resultado de la suma: ${suma}`);
}

sumar(10, 20);



// Ejercicio 4

function dividirNumeros(numerador, denominador) {

    if (typeof numerador !== 'number' || isNaN(numerador)) {
        return "Error: El numerador no es un número válido.";
    }

    if (typeof denominador !== 'number' || isNaN(denominador)) {
        return "Error: El denominador no es un número válido.";
    }

    if (denominador === 0) {
        return "Error: División por cero (infinito).";
    }

    const resultado = numerador / denominador;

    if (!isFinite(resultado)) {
        return "Error: El resultado es infinito.";
    }

   
    return resultado;
}

console.log(dividirNumeros(10, 2));     

// Ejercicio 5


function obtenerLetraDNI(dni) {

    if (typeof dni !== 'number' || dni < 0 || dni > 99999999 || !Number.isInteger(dni)) {

        return "Error: El DNI debe ser un número entero entre 0 y 99999999.";
    }

    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const resto = dni % 23;
    const letra = letras[resto];
    return `${dni}${letra}`;
}


console.log(obtenerLetraDNI(9999999));



// Ejercicio 6

function contarElemento(texto,delimitador){

    let elementos = texto.split(delimitador);

    let cantidad = elementos.length;

    console.log(`Se ha detectado ${cantidad} elementos `)
    for(i=0; i < elementos.length; i++){
        console.log(`Elemento ${i+1}: ${elementos[i]}`)

    }


}

contarElemento("coche|rojo|10 años|diesel|5 puertas","|")



// Ejercicio 7

function evaluarTexto(texto) {

    const textoProcesado = texto.trim().toLowerCase();
    let puntuacion = 0;

    if (textoProcesado.slice(0,2) === "el" ||  textoProcesado.slice(0,2) === "la"){
        puntuacion +=1;

    }

    if (textoProcesado.slice(textoProcesado.length-4,textoProcesado.length) === "ando" ||  textoProcesado.slice(textoProcesado.length-4,textoProcesado.length) === "endo"){
        puntuacion +=10;

    }

    for(i = 0; i < textoProcesado.length; i++ ){
        if (textoProcesado.slice(i,i+5) === " con "  ){
            puntuacion += 100;
            break;

        }
    }

    return puntuacion;
}

console.log(evaluarTexto("El perro esta"));


// Ejercicio 8


function remplazar(text){

    if (text.includes(text)){
        
        let textoCambiado = text.replace(/arriba/g,"abajo" )
        
        console.log("Se encontro la cadena arriba");
        console.log(textoCambiado)




    }else{
        console.log("No se ha encontrado arriba");
    }



}


remplazar("Vamos para arriba arriba")



// Ejercicio 9

function evaluarText(texto) {

    if (texto === texto.toUpperCase()) {
        return "El texto está completamente en mayúsculas.";
    }

    if (texto === texto.toLowerCase()) {
        return "El texto está completamente en minúsculas.";
    }

    return "El texto tiene una combinación de mayúsculas y minúsculas.";
}

console.log(evaluarText("HOLA MUNDO"));       


// Ejercicio 10
function reverso(text){

    let textInvertido = "";

    let textModificado = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");





    for( i = textModificado.length-1; i>=0; i--){
        textInvertido += textModificado[i]
    }

    
    if (textModificado === textInvertido){

        console.log("Es palindromos")

    }else{
        console.log("No es palindromos")
    }

}

reverso("Dábale arroz a la zorra el abad")
reverso("ANILINA")












