function comprobarCaracter(){

    event.preventDefault();

    let texto = document.getElementById("texto").value;

    let caracter = document.getElementById("caracter").value;

    let cantidad = texto.split(caracter).length -1;

    console.log(cantidad);

    let mostrar = document.getElementById("cantidadCaracter");

    mostrar.innerHTML = `${cantidad}`;

}

