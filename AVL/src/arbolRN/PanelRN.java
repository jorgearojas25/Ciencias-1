package arbolRN;

import java.awt.Graphics;
import javax.swing.JComponent;

public class PanelRN extends JComponent {

    private final Arbol arbol;

    public PanelRN(Arbol arbolRN) {
        super();
        arbol = arbolRN;
    }

    public void añadirNodo(int num) {
        arbol.insertaUnNodo(num);
    }

    @Override
    public void paint(Graphics g) {
        super.paint(g);
        arbol.paint(g, this);
    }
}
