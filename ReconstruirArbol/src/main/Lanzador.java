package main;

import cliente.Principal;
import javax.swing.JOptionPane;

/**
 *
 * @author Jorge
 */
public class Lanzador {

    public static void main(String[] args) {
       try {
           Principal ventana = new Principal();
        ventana.setVisible(true);
       }catch(Exception e){
           int ERROR_MESSAGE = JOptionPane.ERROR_MESSAGE;
       }
    }
    
}
