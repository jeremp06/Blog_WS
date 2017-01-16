/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.blog.bean;

import fr.unice.miage.ntdp.blog.Utilisateurs;
import javax.ejb.Stateless;

/**
 *
 * @author edou
 */
@Stateless
public class UtilisateursFacade extends AbstractFacade<Utilisateurs> {
    

    public UtilisateursFacade() {
        super(Utilisateurs.class);
    }
    
}
