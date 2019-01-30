function eliminateDuplicates(arr) {
 	var i,
    len=arr.length,
    out=[],
    obj={};
 	for (i=0;i<len;i++) {
    	obj[arr[i]]=0;
 	}
 	for (i in obj) {
    	out.push(i);
 	}
 	return out;
}

function division(arr){	
	var t = arr.length;
	var raices = [];
	var divisores = [];
	var divisoresNeg = [];
	var div1 = [];
	var div2 = [];
	var aux = [];
	var cont = 0;
	var cont2 = 0;
	var cont3 = 0;
	var cont4 = 0;
	var resultado = 0;
	for(i = 1; i<= Math.abs(arr[0]); i++){
		if(arr[0] % i == 0){
			div1[cont] = i;
			cont = cont + 1;
		}
	}
	for(j = 1; j<= Math.abs(arr[t-1]); j++){
		if(arr[t-1] % j == 0){
			div2[cont2] = j;
			cont2 = cont2 + 1;
		}
	}
	divisores = div1.concat(div2);
	divisores = eliminateDuplicates(divisores);
	for(k = 0;k<divisores.length;k++){
	 	divisoresNeg[k] = divisores[k]*(-1);
	}
	divisores = divisores.concat(divisoresNeg);
	for(h = 0; h < divisores.length; h++){
		for(g = 0; g < arr.length; g++){
			resultado = (resultado+arr[cont3])*divisores[h];
			aux[g] = resultado;
			if(g == (arr.length-1) && resultado == 0){
				raices[cont4] = divisores[h];
				arr = aux;
				h--;
				cont4++;
			}
			cont3++;
			if(g == (arr.length-1)){
				cont3 = 0;
				resultado = 0;
				aux = [];
			}						
		}
	}
	return raices.map((raices)=>parseInt(raices));
}