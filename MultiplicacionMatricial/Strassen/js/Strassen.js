function StrassenMul(a, b, c, leafSize) {
    if (a.n !== b.n || a.m !== b.m || a.n !== a.m) {
        throw "incompatible matrices";
    }
    if (a.n <= leafSize) { return ClassicMul(a, b, c); }

    var A = growNextPowerOf2(a);
    var B = growNextPowerOf2(b);

    var n = A.n;

    var a11 = A.partition(0,   0,   n/2,  n/2);
    var a12 = A.partition(0,   n/2, n/2,  n);
    var a21 = A.partition(n/2, 0,   n,    n/2);
    var a22 = A.partition(n/2, n/2, n,    n);

    var b11 = B.partition(0,   0,   n/2,  n/2);
    var b12 = B.partition(0,   n/2, n/2,  n);
    var b21 = B.partition(n/2, 0,   n,    n/2);
    var b22 = B.partition(n/2, n/2, n,    n);

    var m1 = Matrix.new(n, n);
    var m2 = Matrix.new(n, n);
    var m3 = Matrix.new(n, n);
    var m4 = Matrix.new(n, n);
    var m5 = Matrix.new(n, n);
    var m6 = Matrix.new(n, n);
    var m7 = Matrix.new(n, n);

    Strassen(a11 + a22, b11 + b22, m1, leafSize);
    Strassen(a21 + a22, b11      , m2, leafSize);
    Strassen(a11      , b12 - b22, m3, leafSize);
    Strassen(a22      , b21 - b11, m4, leafSize);
    Strassen(a11 + a12, b22      , m5, leafSize);
    Strassen(a21 - a11, b11 + b12, m6, leafSize);
    Strassen(a12 - a22, b21 + b22, m7, leafSize);

    var c11 = m1 + m4 - m5 + m7;
    var c12 = m3 + m5;
    var c21 = m2 + m4;
    var c22 = m1 + m3 - m2 + m6;

    for (var i = 0; i < c.n; i++) {
        for (var j = 0; j < c.n; j++) {
            if (i < n/2 && j < n/2) {
                c[i][j] = c11[i][j];
            }
            else if (i < n/2 && j >= n/2) {
                c[i][j] = c12[i][j - n/2];
            }
            else if (i >= n/2 && j < n/2) {
                c[i][j] = c21[i - n/2][j];
            }
            else if (i >= n/2 && j >= n/2) {
                c[i][j] = c22[i - n/2][j - n/2];
            }
        }
    }
};