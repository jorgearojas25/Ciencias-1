package estructuras;

/**
 *
 * @author kaffeine
 */
public class Nodo {
    
    private Nodo sig;   // Nodo siguiente
    private Nodo ant;   // Nodo anterior
    private Participante participante;

    public Nodo(String nomEstudiante, String codEstudiante, boolean pago) {
        participante = new Participante(nomEstudiante, codEstudiante, pago);
        this.sig = null;
        this.ant = null;
        
    }

    public Participante getParticipante() {
        return participante;
    }

    public void setParticipante(Participante participante) {
        this.participante = participante;
    }
    public Nodo getSig() {
        return sig;
    }

    public void setSig(Nodo sig) {
        this.sig = sig;
    }

    public Nodo getAnt() {
        return ant;
    }

    public void setAnt(Nodo ant) {
        this.ant = ant;
    }
}
