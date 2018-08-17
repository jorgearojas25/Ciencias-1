var app = angular.module('peorApp', ['nvd3']);
app.controller('controllerP', function($scope) {

  // Ordenamiento burbula simple
  function bubbleSort(myArr){
    var tamanio = myArr.length;
    // Contador para el número de operaciones del algoritmo burbuja
    var contBubble = 1; // pass = 1;
    for (var i = 0; i < tamanio-1; i++) {
      contBubble += 3; //i < tamanio-1; i++
      contBubble += 2; // var j = i+1
      for (var j = i+1; j < tamanio; j++) {
        contBubble += 3; // j < tamanio; j++
        contBubble += 3; // myArr[i] > myArr[j]
        if (myArr[i] > myArr[j]) {
          var temp = myArr[j];
          myArr[j] = myArr[i];
          myArr[i] = temp;
          contBubble += 7; // var temp = myArr[j]; myArr[j] = myArr[i]; myArr[i] = temp;
        }
      }
    }
    return contBubble;
  }
  // Ordenamiento por selección
  function selectionSort(myArr){
    var size = myArr.length;
    var contSelection = 1; // Contador para el número de operaciones del algorito de selección
    for (var slot = 0; slot < size -1; slot ++) {
      contSelection += 3;
      var smallest = slot;
      contSelection += 3;
      for (var check = slot + 1; check < size; check++) {
        contSelection += 5;
        if (myArr[check] < myArr[smallest]) {
          smallest = check;
          contSelection++;
        }
      }
      contSelection += 2;
      if (smallest != slot) {
        var tmpVal = myArr[smallest];
        myArr[smallest] = myArr[slot];
        myArr[slot] = tmpVal;
        contSelection += 7;
      }
    }
    contSelection ++;
    return contSelection;
  }

  // Ordenamiento por inserción
  function insertionSort(myArr) {
    var len = myArr.length;
    var contInsetion = 1; // Contador del número de operaciones
    for (var i = 1; i < len; i++) {
        var tmp = myArr[i];
        contInsetion += 6;
        for (var j = i - 1; j >= 0 && (myArr[j] > tmp); j--) {
            myArr[j + 1] = myArr[j];
            contInsetion += 8;
        }
        myArr[j + 1] = tmp;
        contInsetion += 4;
    }
    contInsetion++;
    return contInsetion;
  }
  // Sobreescribe arr
  function generarArregloPeor() {
    $scope.data[0].values = [];
    $scope.data[1].values = [];
    $scope.data[2].values = [];
    for (var i = 20; i < 201; i++) {
      var arrB = [],
      arrS = [],
      arrI = [];
      for (var j = 0; j < i; j++) {
        //var aleatorio = Math.floor((Math.random() * 200) + 1); // Genera un número aleatorio entre 1 y 100

        arrB.push(100-j);
        arrS.push(100-j);
        arrI.push(100-j);
      }
      $scope.data[0].values.push({x: i, y: bubbleSort(arrB)});
      $scope.data[1].values.push({x: i, y: selectionSort(arrS)});
      $scope.data[2].values.push({x: i, y: insertionSort(arrI)});
    }
  }

  // Muestra en el div correspondiente el arreglo ordenado
  $scope.mostrarArreglo = function() {
    generarArregloPeor();
  }

  $scope.options = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 40,
        left: 90
      },
      x: function(d){ return d.x; },
      y: function(d){ return d.y; },
      useInteractiveGuideline: true,
      xAxis: {
        axisLabel: 'Tamaño Arreglo (X)'
      },
      yAxis: {
        axisLabel: 'Nº Operaciones (Y)',
        tickFormat: function(d){
          return d3.format('.f')(d);
        },
        axisLabelDistance: 20
      },
    },
    title: {
      enable: true,
      text: 'Tabla de comparación entre los algoritmos de ordenamiento'
    }
  };

  $scope.data = [
    {
      key: 'Burbuja',
      values: [],
      color: '#00FF00'
    },
    {
      key: 'Selección',
      values: [],
      color: '#FA58D0'
    },
    {
      key: 'Inserción',
      values: [],
      color: '#2E2EFE'
    }
  ];
});
