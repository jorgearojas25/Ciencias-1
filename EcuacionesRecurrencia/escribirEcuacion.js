function truncar(num){
	num = num*1000;
	num = Math.trunc(num);
	num = num/1000;
	return num;
}

function armarEcuacion (coefC, raices, numRep){
	var cadena = "La ecuacion en recurrencia es: Fn = ";
	numRep = numRep.length;
	var cont = 1;
	if(numRep==0){
		for(i = 0; i < raices.length; i++){
			if(i == 0){
				cadena = cadena + " (" +  truncar(coefC[i]) + ")*" + "(" + raices[i] + ")^n" ;
			}else{
				cadena = cadena + " + " + " (" +  truncar(coefC[i]) + ")*" + "(" + raices[i] + ")^n " ;
			}
		}
	}else{
		for(i = 0; i < raices.length; i++){
			if (raices[i] == raices[i-1] && i>0){
				cadena = cadena + " + " + " (" +  truncar(coefC[i]) + ")*" + "(n^" + cont + ")"+ "*(" + raices[i] + ")^n" ;
				cont++;
			}else{
				cont = 1;
				if(i == 0){
					cadena = cadena + "(" +  truncar(coefC[i]) + ")*" + "(" + raices[i] + " )^n" ;
				}else{
					cadena = cadena + " + " + " (" +  truncar(coefC[i]) + ")*" + "(" + raices[i] + ")^n" ;
				}					
			}	
		}
	}
	return cadena;
}

function armarEcuacionCv(coefC,numRep,coefO){
	var cadena = "La ecuancion en recurrencia con cambio de variable es: Fn = ";
	numRep = numRep.length;
	if(numRep == 0){
		cadena = cadena + truncar(coefC[0]) + "*n^" + truncar(Math.log2(coefO[1])) + " + " + truncar(coefC[1]);	
	}else{
		cadena = cadena + truncar(coefC[0]) + " + " + truncar(coefC[1]) + "*" + "lg(n)";
	}
}