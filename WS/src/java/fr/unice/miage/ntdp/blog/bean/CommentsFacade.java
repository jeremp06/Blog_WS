/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.blog.bean;

import fr.unice.miage.ntdp.blog.Comments;
import javax.ejb.Stateless;

/**
 *
 * @author edou
 */
@Stateless
public class CommentsFacade extends AbstractFacade<Comments> {
    

    public CommentsFacade() {
        super(Comments.class);
    }
    
}
