package estructuras;

import javafx.util.converter.BigIntegerStringConverter;

/**
 *
 * @author kaffeine
 */
public class LinkedList {

    private Nodo cab;
    private int size;

    public LinkedList() {
        cab = null;
        this.size = 0;
    }
    
    /**
     * 
     * @param nombre
     * @param boleta
     * @param pago
     * @return 
     */
    public int insertar(String nombre, String boleta, String foto, boolean pago) {
        BigIntegerStringConverter bg = new BigIntegerStringConverter();
        Nodo p, q;
        Nodo nv = new Nodo(nombre, boleta, pago);
        if (cab == null) {
            cab = nv;
            size++;
            return 0;
        } else {
            p = cab;
            q = null;
            while (p != null) {
                // compara si codEstudiante es mayor a p.codEstudiante
                if (bg.fromString(boleta).compareTo(bg.fromString(p.getParticipante().getBoleta())) > 0) {
                    q = p;
                    p = p.getSig();

                    if (p == null) {
                        nv.setAnt(q);
                        nv.setSig(p);
                        q.setSig(nv);
                    } else {
                        p.setAnt(nv);
                    }
                    // Aquí el estudiante ya está registrado    
                } else if (bg.fromString(boleta).compareTo(bg.fromString(p.getParticipante().getBoleta())) == 0) {
                    return 1;
                            
                    // Aqui el estudiante registrado tiene un código menor    
                } else {
                    if (q == null) {
                        Nodo tmp = cab;
                        cab = nv;
                        cab.setSig(tmp);
                        cab.setAnt(q);
                        size++;
                        return 0;
                    } else {
                        nv.setAnt(q);
                        nv.setSig(p);
                        q.setSig(nv);
                        p.setAnt(nv);
                    }

                    q = p;
                    p = p.getSig();
                }
            }
            size++;
            return 0;
        }
    }

    /**
     * Retorna el tamaño de la lista
     *
     * @return un entero con el tamaño de la lista
     */
    public int size() {
        return this.size;
    }

    public Participante[] recorrer() {
        Nodo p, q;
        p = cab;
        int cont = 0;
        Participante arrEstudiantes[] = new Participante[this.size];
        while (p != null) {
            q = p;
            p = p.getSig();
            arrEstudiantes[cont] = q.getParticipante();
            cont++;
        }
        return arrEstudiantes;
    }

    public Nodo buscar(String codEstudiante) {
        Nodo p, q;
        p = cab;
        q = null;

        while (p != null) {
            q = p;
            p = p.getSig();
            if (q.getParticipante().getBoleta().equals(codEstudiante)) {
                return q;
            }
        }
        return null;
    }

 
}
