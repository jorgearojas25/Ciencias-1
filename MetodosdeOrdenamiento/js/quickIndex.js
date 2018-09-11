var app = angular.module('OrdenamientoApp', ['nvd3']);
app.controller('controller', function($scope) {

  var contQuick = 0; // Contador para el número de operaciones del algoritmo quick
  function quickSort(array, left, right, compare, swap) {
    contQuick++;
    if (left < right) {
      contQuick += 2;
      var pivot = partitionRandom(array, left, right, compare, swap);
      quickSort(array, left, pivot - 1, compare, swap);
      quickSort(array, pivot + 1, right, compare, swap);
      contQuick += 4;
    }
    return array;
  }

  function partitionRandom(array, left, right, compare, swap) {
    var pivot = left + Math.floor(Math.random() * (right - left));
    contQuick += 5;
    if (pivot !== right) {
      swap(array, right, pivot);
      contQuick++;
    }
    contQuick++;
    return partitionRight(array, left, right, compare, swap);
  }

  function partitionRight(array, left, right, compare, swap) {
    var mid = left;
    contQuick += 2;
    for (var i = mid; i < right; i++) {
      contQuick += 4;
      if (compare(array, i, right) <= 0) {
        contQuick++;
        if (i !== mid) {
          contQuick++;
          swap(array, i, mid);
        }
        mid++;
        contQuick++;
      }
    }
    contQuick++;
    if (right !== mid) {
      contQuick++;
      swap(array, right, mid);
    }
    return mid;
  }


  // Sobreescribe arr
  function generarArreglo() {
    $scope.data[0].values = [];
    for (var i = 20; i < 201; i++) {
      var arrQ = [];
      for (var j = 0; j < i; j++) {
        var aleatorio = Math.floor((Math.random() * 200) + 1); // Genera un número aleatorio entre 1 y 200
        arrQ.push(aleatorio);
      }
      $scope.data[0].values.push({x: i, y: contQuick});
    }
  }

  // Muestra en el div correspondiente el arreglo ordenado
  $scope.mostrarArreglo = function() {
    generarArreglo();
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
      text: 'Valores Algoritmo de ordenamiento QuickSort'
    }
  };

  $scope.data = [
    {
      key: 'QuickSort',
      values: [],
      color: '#585858'
    }
  ];
});
