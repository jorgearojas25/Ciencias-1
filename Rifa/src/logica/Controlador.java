package logica;

import estructuras.*;

/**
 *
 * @author Juan Camilo
 */
public class Controlador {

    private LinkedList lista;
    private Nodo nodo;
    private String nombre;
    private String codigo;
    private boolean pago = false;

    public Controlador() {
        lista = new LinkedList();
    }

    public int registrar(String nombre, String codigo, String foto, boolean pago) {
        this.recorrer();
        return lista.insertar(nombre, codigo, foto, pago);
    }

    public String buscar(String codigo) {
        Nodo n = lista.buscar(codigo);
        if (n == null) {
            return "Participante no encontrado";
        } else {
            this.nombre = n.getParticipante().getNombre();
            this.codigo = n.getParticipante().getBoleta();
            this.pago = n.getParticipante().getPago();
            return null;
        }
    }

    public String[][] recorrer() {
        int tamanio = lista.size();
        String pago;
        String info[][] = new String[tamanio][4];
        Participante arrParticipantes[] = lista.recorrer();
        for (int i = 0; i < arrParticipantes.length; i++) {
            pago = "";
            info[i][0] = arrParticipantes[i].getBoleta();
            info[i][1] = arrParticipantes[i].getNombre();
            if (arrParticipantes[i].getPago() == false) {
                pago = "Apartado";
            } else {
                pago = "Pagado";
            }
            info[i][2] = pago;

        }
        return info;
    }

    // Getter
    public String getNombre() {
        return nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public boolean getPago() {
        return pago;
    }
}
