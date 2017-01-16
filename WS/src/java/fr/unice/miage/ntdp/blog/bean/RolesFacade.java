/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.blog.bean;

import fr.unice.miage.ntdp.blog.Roles;
import javax.ejb.Stateless;

/**
 *
 * @author edou
 */
@Stateless
public class RolesFacade extends AbstractFacade<Roles> {
   

    public RolesFacade() {
        super(Roles.class);
    }
    
}
