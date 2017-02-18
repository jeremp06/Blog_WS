/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Articles;
import entity.Comments;
import entity.Utilisateurs;
import java.util.Collection;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Jeremy
 */
@Stateless
@Path("entity.articles")
public class ArticlesFacadeREST extends AbstractFacade<Articles> {

    @PersistenceContext(unitName = "WS_BlogPU")
    private EntityManager em;

    public ArticlesFacadeREST() {
        super(Articles.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Articles entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Long id, Articles entity) {
        super.edit(entity);
    }

    @GET
    @Path("status/{status}")
    @Produces({"application/xml", "application/json"})
    @Override
    public List<Articles> findByStatus(@PathParam("status") long status) {
        return super.findByStatus(status);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Articles find(@PathParam("id") Long id) {
        return super.find(id);
    }
    
    @GET
    @Path("utilisateur/{id}")
    @Produces({"application/xml", "application/json"})
    public Utilisateurs findUtilisateur(@PathParam("id") Long id) {
        return super.find(id).getUtilisateur();
    }
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Articles> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Articles> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
    
    @GET
    @Path("comments/{id}")
    @Produces({"application/xml", "application/json"})
    public Collection<Comments> findComments(@PathParam("id") long id) {
        return super.find(id).getCommentsCollection();
    }
    
    @GET
    @Path("countComments/{id}")
    @Produces({"application/xml", "application/json"})
    public int countComments(@PathParam("id") long id) {
        return super.find(id).getCommentsCollection().size();
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
