function comprobarCaracter(){

    texto = document.getElementById("texto").value;

    caracter = document.getElementById("caracter").value;

    cantidad = texto.split(caracter).length -1;

    mostrar = document.getElementById("cantidadCaracter");

    console.log(cantidad)

    mostrar.innerHTML = `${cantidad}`


}