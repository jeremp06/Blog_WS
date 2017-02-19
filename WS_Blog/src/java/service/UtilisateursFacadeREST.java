/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Articles;
import entity.Roles;
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
import jsonObject.Connexion;

/**
 *
 * @author Jeremy
 */
@Stateless
@Path("entity.utilisateurs")
public class UtilisateursFacadeREST extends AbstractFacade<Utilisateurs> {

    @PersistenceContext(unitName = "WS_BlogPU")
    private EntityManager em;

    public UtilisateursFacadeREST() {
        super(Utilisateurs.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Utilisateurs entity) {
        super.create(entity);
 
        
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Long id, Utilisateurs entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Utilisateurs find(@PathParam("id") Long id) {
        return super.find(id);
    }
    
    @GET
    @Path("articles/{id}")
    @Produces({"application/xml", "application/json"})
    public Collection<Articles> findArticles(@PathParam("id") long id) {
        return super.find(id).getArticlesCollection();
    }

    @POST
    @Path("connexion")
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Utilisateurs connexion(final Connexion connexion) {
        return super.findUtilisateur(connexion.username, connexion.password);

    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Utilisateurs> findAll() {
        return super.findAll();
    }
    @GET
    @Path("countArticle/{id}")
    @Produces({"application/xml", "application/json"})
    public int countArticle(@PathParam("id") long id) {
        return super.find(id).getArticlesCollection().size();
    }
    @GET
    @Path("status/{status}")
    @Produces({"application/xml", "application/json"})
    @Override
    public List<Utilisateurs> findByStatus(@PathParam("status") long status) {
        return super.findByStatus(status);
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Utilisateurs> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
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
