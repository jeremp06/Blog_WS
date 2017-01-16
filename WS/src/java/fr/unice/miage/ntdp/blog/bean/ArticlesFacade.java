/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.blog.bean;

import fr.unice.miage.ntdp.blog.Articles;
import javax.ejb.Stateless;

/**
 *
 * @author edou
 */
@Stateless
public class ArticlesFacade extends AbstractFacade<Articles> {
   

    public ArticlesFacade() {
        super(Articles.class);
    }
    
}
