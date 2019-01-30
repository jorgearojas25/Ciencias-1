function recibirDatos() {
	var gradEcuacion = parseInt(document.getElementById("entradaGradEcu").value);
	let arrFn = [];
	let arrN = [];
	let arrCoef = [];

	for (let i = 0; i <= gradEcuacion; i++) {
		let cadenaIdCoef = "coef-" + i;
		let valCoef = parseInt(document.getElementById(cadenaIdCoef).value);
		arrCoef[i] = valCoef;
		//console.log(arrCoef[i]);
	}

	for (let j = 0; j < gradEcuacion; j++) {
		let cadenaIdFn = "Fn-" + j;
		let cadenaIdN = "N-" + j;
		arrN[j] = parseInt(document.getElementById(cadenaIdN).value);
		arrFn[j] = parseInt(document.getElementById(cadenaIdFn).value);
		//console.log(arrN[j]);
		//console.log(arrFn[j]);
	}
	solucion(arrCoef, arrFn, arrN, gradEcuacion)
}