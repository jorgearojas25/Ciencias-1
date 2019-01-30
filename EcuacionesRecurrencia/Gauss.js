function gauss(matriz,numFilas,numColumnas){
	var arr = [];
	for(i=0;i<numFilas;i++){
		for(j=0;j<numColumnas;j++){
			if(i == j){
				matriz[i] =  encontrarPivote(matriz[i], matriz[i][j]);				
			}
			if(i == j && matriz[i][j] == 1){
				matriz = reduccion(matriz,i,j,numColumnas,numFilas);	
			}		
		}
		//console.log(matriz.join(", "));		
	}
	for(z=0;z<numFilas;z++){
		arr[z] = matriz[z][(numColumnas-1)];
	}
	//console.log(arr.join(", "));
	return arr;	
}

function encontrarPivote(arr,divisor){
	for(h=0; h<arr.length; h++){
		arr[h] = arr[h]/divisor;
	}
	return arr;
}

function reduccion(matriz,fila,columna,numColumnas,numFilas){
	var aux = 0;
	if(fila == 0){
		for(k = 1; k<numFilas; k++){
			aux = matriz[k][j];
			for(m = 0; m<numColumnas; m++){
				if(aux>=0){
					if(aux != 0){
						matriz[k][m] = (matriz[fila][m]*(-aux)) + matriz[k][m];
					}	
				}else if(aux<0){
					if(aux != 0){
						matriz[k][m] = (matriz[fila][m]*Math.abs(aux)) + matriz[k][m];
					}	
				}	
			}
		}
	}else if(fila == (numFilas-1)){
		for(k = 0; k<(numFilas-1); k++){
			aux = matriz[k][j];
			for(m = 0; m<numColumnas; m++){
				if(aux>=0){
					if(aux != 0){
						matriz[k][m] = (matriz[fila][m]*(-aux)) + matriz[k][m];
					}	
				}else if(aux<0){
					if(aux != 0){
						matriz[k][m] = (matriz[fila][m]*Math.abs(aux)) + matriz[k][m];
					}	
				}	
			}
		}
	}else{
		for(k = 0; k<numFilas; k++){
			aux = matriz[k][j];
			for(m = 0; m<numColumnas; m++){
				if(k != fila){
					if(aux>=0){
						if(aux != 0){
							matriz[k][m] = (matriz[fila][m]*(-aux)) + matriz[k][m];
						}	
					}else if(aux<0){
						if(aux != 0){
							matriz[k][m] = (matriz[fila][m]*Math.abs(aux)) + matriz[k][m];
						}	
					}
				}			
			}
		}		
	}
	return matriz;
}