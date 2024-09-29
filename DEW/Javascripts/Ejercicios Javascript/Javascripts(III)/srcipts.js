function generarArrayAleatorio(numElementos = 10, valorMinimo = 100, valorMaximo = 200) {
    const arrayAleatorio = [];
    
    for (let i = 0; i < numElementos; i++) {
        // Generar un número aleatorio entre valorMinimo y valorMaximo
        const numeroAleatorio = Math.floor(Math.random() * (valorMaximo - valorMinimo + 1)) + valorMinimo;
        arrayAleatorio.push(numeroAleatorio);
    }
    
    return arrayAleatorio;
}
console.log(generarArrayAleatorio());

