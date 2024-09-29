
// Ejercicio 1
function generarArrayAleatorio(numElementos = 10, valorMinimo = 100, valorMaximo = 200) {
    const arrayAleatorio = [];
    
    for (let i = 0; i < numElementos; i++) {

        const numeroAleatorio = Math.floor(Math.random() * (valorMaximo - valorMinimo + 1)) + valorMinimo;
        arrayAleatorio.push(numeroAleatorio);
    }
    
    return arrayAleatorio;
}
// console.log(generarArrayAleatorio(5));



// Ejercicio 2
function ordenar(){

    let arrayAleatorio = generarArrayAleatorio(20,20,100);

    return arrayAleatorio.sort((a, b) => a - b);

}

// console.log(ordenar());

// Ejercicio 3
function desordenar(){

    let arrayOrdenado = ordenar();

    for(i = 0; i< arrayOrdenado.length; i++){

        let elem = arrayOrdenado.shift(arrayOrdenado[i]);

        let num = Math.floor(Math.random() * arrayOrdenado.length);

        
        arrayOrdenado.splice(num, 0, elem);



    }

    return arrayOrdenado;

}

// console.log(desordenar());


//Ejercicio 4

function gestion(){

    let arrayAleatorio = generarArrayAleatorio(15,-10,20);

    console.log(arrayAleatorio)

    nuevaArray = [];
    let valor = "";

    for(i=0; i < arrayAleatorio.length ; i++ ){

        if (arrayAleatorio[i] <= -5) {
            valor = nuevaArray.splice(0, 1);
            console.log(`El valor de x es: ${arrayAleatorio[i]}`);
            console.log("Eliminar el primer elemento del array");
            console.log(`El numero eliminado: ${valor}`);
            console.log(`El tamaño de la lista: ${nuevaArray.length}`);

        } else if (-5 < arrayAleatorio[i] && arrayAleatorio[i] <= 0) {
            valor = nuevaArray.splice(nuevaArray.length - 1, 1);
            console.log(`El valor de x es: ${arrayAleatorio[i]}`);
            console.log("Eliminar el último elemento del array");
            console.log(`El numero eliminado: ${valor}`);
            console.log(`El tamaño de la lista: ${nuevaArray.length}`);

        } else if (0 < arrayAleatorio[i] && arrayAleatorio[i] <= 10) {
            valor = arrayAleatorio[i];
            console.log(`El valor de x es: ${arrayAleatorio[i]}`);
            console.log("Añadir x al principio del array");
            console.log(`El numero añadir: ${valor}`);
            nuevaArray.unshift(valor);
            console.log(`El tamaño de la lista: ${nuevaArray.length}`);

        } else if (arrayAleatorio[i] > 10 && arrayAleatorio[i] <= 20) {
            valor = arrayAleatorio[i];
            console.log(`El valor de x es: ${arrayAleatorio[i]}`);
            console.log("Añadir x al final del array");
            console.log(`El numero añadir: ${valor}`);
            nuevaArray.push(valor);
            console.log(`El tamaño de la lista: ${nuevaArray.length}`);
        }
    }

}

// gestion()

// Ejercicio 5

function raizCuadrada(array){

    let num = 0;

    arrayCuadrada = [];


    for(i=0; i < array.length; i++){

        num =  Math.sqrt(array[i]);

        arrayCuadrada.push(num);

    }

    return arrayCuadrada;
}

// console.log(raizCuadrada(generarArrayAleatorio(20,60,100)));



// Ejercicio 6

function maxYMin(array){

    console.log(array)

    const numMax = Math.max(...array);
    const numMin = Math.min(...array);

    const indexMax = array.indexOf(numMax);
    const indexMin = array.indexOf(numMin);

    let valor = `El nunero maximo: ${numMax}, esta en la posicion: ${indexMax}\t
    El numero minimo: ${numMin}, esta en la posicion: ${indexMin}`;
    return valor




}


// console.log(maxYMin(generarArrayAleatorio(20,-100,100)));


//Ejercicio 7



function mostrar(array){

    let count = 0;
    let registro = [];

    console.log(array)

    for(i= 0; i < array.length; i++){

        for(j= 0; j < registro.length; j++){

            if  (registro[j] === array[i]){

                count++;

            }
        }
        if (count === 0){

            registro.push(array[i]);
            console.log(`Es la primera vez que aparece este numero: ${array[i]}`);


        }else{
            count = 0;
            console.log(`No es la primera vez que aparece este numero: ${array[i]}`);
        }
    }

}
// mostrar(generarArrayAleatorio(50, -100, 100));


function mostrarCantidad(array){

    let count = 0;
    let registro = {};

    console.log(array)

    for(i= 0; i < array.length; i++){

        for(j= 0; j < registro.length; j++){

            if  (registro[j] === array[i]){

                count++;

            }
        }
        if (count === 0){

            registro.push(array[i]);
            console.log(`Es la primera vez que aparece este numero: ${array[i]}`);


        }else{
            count = 0;
            console.log(`No es la primera vez que aparece este numero: ${array[i]}`);
        }
    }

}



mostrarCantidad(generarArrayAleatorio((50, -100, 100)));










