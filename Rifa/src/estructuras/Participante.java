package estructuras;

public class Participante {
    
    private String nombre; // Nombre del estudiante
    private String boleta; // Código del estudiante
    private boolean pago; // Notas del estudiante

    public Participante(String nombre, String boleta, boolean pago) {
        this.nombre = nombre;
        this.boleta = boleta;
        this.pago = pago;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getBoleta() {
        return boleta;
    }

    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }

    public boolean getPago() {
        return pago;
    }

    public void setPago(boolean pago) {
        this.pago = pago;
    }
}

