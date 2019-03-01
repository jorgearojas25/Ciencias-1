package arbolRN;

import java.awt.Graphics;
import javax.swing.JComponent;

public class Arbol {

    private Nodo raiz;
    private int altura = 0;
    public int rotIzq = 0;
    public int rotDer = 0;
    public int rotDobleIzq = 0;
    public int rotDobleDer = 0;
    private int numNodo;

    public void paint(Graphics g, JComponent panel) {
        darUbicacion(panel, raiz);
        if (raiz != null) {
            raiz.paint(g);
        }
    }

    //Cuadra la posicion de los nodos
    //da las coordenadas que utiliza el metodo pintar
    private void darUbicacion(JComponent panel, Nodo nodo) {

        if (nodo != null) {

            //Cuantos niveles tiene el arbol
            int n = darNiveles(raiz, 0, nodo.getDato());
            //Comprueba la altura
            this.actualizarAltura(raiz, 0);
            //Hace una division de posiciones
            int quadrant = panel.getHeight() / altura;

            //Da la posicion y del nodo
            int pos_y = quadrant * n;

            //Da la posicion x del nodo           
            int pos_x;

            if (nodo == raiz) {
                pos_x = getIncrementoX(nodo, panel.getWidth()) - 5;
                nodo.setX(pos_x);
            }
            if (nodo.getHijoIzq() != null) {
                pos_x = nodo.getX() - getIncrementoX(nodo.getHijoIzq(), panel.getWidth());
                nodo.getHijoIzq().setX(pos_x);
            }
            if (nodo.getHijoDer() != null) {
                pos_x = nodo.getX() + getIncrementoX(nodo.getHijoDer(), panel.getWidth());
                nodo.getHijoDer().setX(pos_x);
            }

            //Asigna posicion a los hijos
            if (nodo.getHijoIzq() != null) {
                darUbicacion(panel, nodo.getHijoIzq());
            }
            if (nodo.getHijoDer() != null) {
                darUbicacion(panel, nodo.getHijoDer());
            }

            //Asigna posicion al padre
            nodo.setY(pos_y);
        }
    }

    //Nos da el incremento en x que es para cada uno de los nodos
    private int getIncrementoX(Nodo nodo, int ancho) {
        int n = darNiveles(raiz, 0, nodo.getDato());
        //Nos da el numero de nodos ideal para el nivel actual
        int dos_n = (int) Math.pow(2, n);
        //Calcula la posicion del nodo      
        return (int) ((ancho / dos_n) / 2);
    }

    public void insertaUnNodo(int numero) {
        Nodo nodoNuevo = new Nodo(numero, true);
        Nodo nodoActual = raiz;
        Nodo nodoTemporal;
        numNodo = numero;
        rotDer = 0;
        rotIzq = 0;
        rotDobleDer = 0;
        rotDobleIzq = 0;

        boolean esHijoDer;

        // ve si el arbol esta vacio y crea el nodo como raiz
        if (raiz == null) {
            raiz = new Nodo(numero, false);
        } else if (!contiene(raiz, numero)) {
            while (true) {
                // recorre los nodos que existan para buscar el lugar del nuevo nodo en base a su numero
                if (numero < nodoActual.getDato()) {
                    if (nodoActual.getHijoIzq() != null) {
                        nodoTemporal = nodoActual;
                        nodoActual = nodoActual.getHijoIzq();
                        nodoActual.setPadre(nodoTemporal);
                    } else {
                        nodoActual.setHijoIzquierdo(nodoNuevo);
                        nodoNuevo.setPadre(nodoActual);
                        esHijoDer = false;
                        break;
                    }
                } else {
                    if (nodoActual.getHijoDer() != null) {
                        nodoTemporal = nodoActual;
                        nodoActual = nodoActual.getHijoDer();
                        nodoActual.setPadre(nodoTemporal);
                    } else {
                        nodoActual.setHijoDerecho(nodoNuevo);
                        nodoNuevo.setPadre(nodoActual);
                        esHijoDer = true;
                        break;
                    }
                }
            }
            // en caso de que se presente que el padre del nuevo nodo es rojo envia al metodo que soluciona esto
            if (nodoNuevo.getPadre().getRojo()) {
                casoRojoRojo(nodoNuevo.getPadre(), esHijoDer);
            }
        }
    }

    // soluciona si al insertar se presenta un caso donde el nodo padre del nuevo nodo es rojo
    private void casoRojoRojo(Nodo nodo, boolean hijoDer) {

        Nodo nodoPadre = nodo.getPadre();
        Nodo nodoHermano;
        Nodo temporal;

        if (nodoPadre.getHijoIzq() != null && nodoPadre.getHijoDer() != null) {
            // Identifica cual es el nodoHermano
            if (nodo == nodoPadre.getHijoIzq()) {
                nodoHermano = nodoPadre.getHijoDer();
            } else {
                nodoHermano = nodoPadre.getHijoIzq();
            }
            // Si el nodoHermano es rojo
            if (nodoHermano.getRojo()) {
                nodoHermano.setRojo(false);
                nodo.setRojo(false);

                if (nodoPadre != raiz) {
                    nodoPadre.setRojo(true);
                }

                if (nodoPadre.getPadre() != null) {
                    // revisa que no se haya creado un caso rojo-rojo hacia arriba
                    if (nodoPadre.getPadre().getRojo()) {
                        casoRojoRojo(nodoPadre.getPadre(), nodoPadre.getPadre().getHijoIzq() != nodoPadre);
                    }
                }
                return;
            }
        }

        if (!hijoDer && nodoPadre.getHijoIzq() == nodo) {
            // caso tres: reestructurar
            //Rotacion Simple Derecha
            //si la rotacion es doble no cuenta la simple
            if (rotDobleDer == 0) {
                rotDer = rotDer + 1;
            }

            //JOptionPane.showMessageDialog(null, "1: " + rotIzq);
            nodo.setRojo(false);
            nodoPadre.setRojo(true);
            // hace una rotacion
            temporal = nodo.getHijoDer();
            nodo.setHijoDerecho(nodoPadre);
            nodo.setPadre(nodoPadre.getPadre());
            nodoPadre.setPadre(nodo);
            nodoPadre.setHijoIzquierdo(temporal);

            if (temporal != null) {
                temporal.setPadre(nodoPadre);
            }
            if (nodo.getPadre() != null) {
                temporal = nodo.getPadre();
                if (temporal.getHijoIzq() == nodo.getHijoDer()) {
                    temporal.setHijoIzquierdo(nodo);
                } else {
                    temporal.setHijoDerecho(nodo);
                }
            } else {
                raiz = nodo;
            }

        } else if (hijoDer && nodoPadre.getHijoDer() == nodo) {
            // caso cuatro: reestructurar
            //Rotacion Simple Izquierda
            //si la rotacion es doble no cuenta la simple
            if (rotDobleIzq == 0) {
                rotIzq = rotIzq + 1;
            }
            nodo.setRojo(false);
            nodoPadre.setRojo(true);

            temporal = nodo.getHijoIzq();
            nodo.setHijoIzquierdo(nodoPadre);
            nodo.setPadre(nodoPadre.getPadre());
            nodoPadre.setPadre(nodo);
            nodoPadre.setHijoDerecho(temporal);

            if (temporal != null) {
                temporal.setPadre(nodoPadre);
            }
            if (nodo.getPadre() != null) {
                temporal = nodo.getPadre();
                if (temporal.getHijoIzq() == nodo.getHijoIzq()) {
                    temporal.setHijoIzquierdo(nodo);
                } else {
                    temporal.setHijoDerecho(nodo);
                }
            } else {
                raiz = nodo;
            }

        } else if (hijoDer && nodoPadre.getHijoIzq() == nodo) {
            // caso cinco: reestructurar
            //Rotacion Doble Derecha
            rotDobleDer = rotDobleDer + 1;
            nodoHermano = nodo.getHijoDer();
            temporal = nodoHermano.getHijoIzq();
            nodoPadre.setHijoIzquierdo(nodoHermano);
            nodoHermano.setPadre(nodoPadre);
            nodoHermano.setHijoIzquierdo(nodo);
            nodo.setPadre(nodoHermano);
            nodo.setHijoDerecho(temporal);

            if (temporal != null) {
                temporal.setPadre(nodo);
            }

            // lleva al caso tres
            casoRojoRojo(nodoHermano, false);

        } else if (!hijoDer && nodoPadre.getHijoDer() == nodo) {
            // caso seis: reestructurar
            //Rotacion Doble Izquierda
            rotDobleIzq = rotDobleIzq + 1;
            nodoHermano = nodo.getHijoIzq();
            temporal = nodoHermano.getHijoDer();
            nodoPadre.setHijoDerecho(nodoHermano);
            nodoHermano.setPadre(nodoPadre);
            nodoHermano.setHijoDerecho(nodo);
            nodo.setPadre(nodoHermano);
            nodo.setHijoIzquierdo(temporal);

            if (temporal != null) {
                temporal.setPadre(nodo);
            }
            // lleva al caso cuatro
            casoRojoRojo(nodoHermano, true);
        }
    }

    private int darNiveles(Nodo nodo, int suma, int dat) {
        if (nodo.getDato() == dat) {
            return suma;
        } else if (contiene(nodo.getHijoIzq(), dat)) {
            suma = 1 + darNiveles(nodo.getHijoIzq(), suma, dat);
        } else if (contiene(nodo.getHijoDer(), dat)) {
            suma = 1 + darNiveles(nodo.getHijoDer(), suma, dat);
        }
        return suma;
    }

    private void actualizarAltura(Nodo nodo, int cont) {
        if (nodo != null) {
            cont++;
            if (nodo.esHoja()) {
                if (cont > altura) {
                    altura = cont;
                }
            } else {
                actualizarAltura(nodo.getHijoIzq(), cont);
                actualizarAltura(nodo.getHijoDer(), cont);
            }
        }
    }

    private boolean contiene(Nodo nodo, int dato) {
        if (nodo == null) {
            return false;
        } else {
            return nodo.getDato() == dato || contiene(nodo.getHijoIzq(), dato) || contiene(nodo.getHijoDer(), dato);
        }
    }

    public int darNumeroNodo() {
        System.out.println("numNodo" + numNodo);
        return numNodo;
    }

    public int darRotacionSimpleDerecha() {
        System.out.println("rotDer" + rotDer);
        return rotDer;
    }

    public int darRotacionSimpleIzquierda() {
        System.out.println("rotIzq" + rotIzq);
        return rotIzq;
    }

    public int darRotacionDobleDerecha() {
        System.out.println("rotDobleDer" + rotDobleDer);
        return rotDobleDer;
    }

    public int darRotacionDobleIzquierda() {
        System.out.println("rotDobleIzq" + rotDobleIzq);
        return rotDobleIzq;
    }

}
