function solucion(arregloCoef, arregloFn, arregloN, gradEcuacion){
	let raicesEcuacion = division(arregloCoef);
	let retornoArmaMatriz = armarMatriz(raicesEcuacion, raicesEcuacion.length, arregloFn, arregloN);
	let matrizCoef = retornoArmaMatriz[0];
	let numRaizRep = retornoArmaMatriz[1];
	let arrC = gauss(matrizCoef, arregloN.length, raicesEcuacion.length+1);
	console.log("numero de raices: "+ raicesEcuacion.length + " Numero coefC: " + arrC.length);
	let ecuacionArmada = armarEcuacion(arrC, raicesEcuacion, numRaizRep);
	mostrarEcuacionPantalla(ecuacionArmada);
}