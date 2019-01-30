function generarEntradas() {
	
	var gradEcuacion = parseInt(document.getElementById("entradaGradEcu").value);
	const divCondIni = document.getElementById("condIniciales");
	const divCoef = document.getElementById("coeficientes");
	const divN = document.createElement("div");
	const divFn = document.createElement("div");
	const btnSol = document.getElementById("btnSolucion");

	let labelN = document.createElement("label");
	let labelFn = document.createElement("label");
	let labelCoef = document.createElement("label");

	labelN.innerHTML = "Si N es:";
	labelFn.innerHTML = "Valor de Fn es:";
	labelCoef.innerHTML = "Los coeficientes son:"

	divN.appendChild(labelN);
	divFn.appendChild(labelFn);
	//divCondIni.appendChild(document.createElement("br"));

	for (let i = 0; i < gradEcuacion; i++) {
		let inputN = document.createElement("input");
		let inputFn = document.createElement("input");
		inputN.type = "text";
		inputFn.type = "text";
		inputN.id = "N-" + i;
		inputFn.id = "Fn-" + i;
		divN.appendChild(inputN);
		divFn.appendChild(inputFn);
		//divCondIni.appendChild(document.createElement("br"));
	}

	divCondIni.appendChild(divN);
	divCondIni.appendChild(divFn);

	divCoef.appendChild(labelCoef);
	divCoef.appendChild(document.createElement("br"));

	for (let j = 0; j <= gradEcuacion; j++) {
		let inputCoef = document.createElement("input");
		inputCoef.type = "text";
		inputCoef.id = "coef-" + j;
		divCoef.appendChild(inputCoef);
		divCoef.appendChild(document.createElement("br"));
	}

	btnSol.style.display = "inline-block";

}

function mostrarEcuacionPantalla(ecuacion){
	const divSalida = document.getElementById("divSalida");
	let pSalida = document.createElement("p");
	pSalida.innerHTML = ecuacion;
	divSalida.appendChild(pSalida);
}