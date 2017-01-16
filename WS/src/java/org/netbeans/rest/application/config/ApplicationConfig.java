/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.netbeans.rest.application.config;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Jeremy
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(fr.unice.miage.ntdp.blog.Articles.class);
        resources.add(fr.unice.miage.ntdp.blog.Comments.class);
        resources.add(fr.unice.miage.ntdp.blog.Roles.class);
        resources.add(fr.unice.miage.ntdp.blog.Utilisateurs.class);
        resources.add(fr.unice.miage.ntdp.blog.services.ArticlesFacadeREST.class);
        resources.add(fr.unice.miage.ntdp.blog.services.CommentsFacadeREST.class);
        resources.add(fr.unice.miage.ntdp.blog.services.RolesFacadeREST.class);
        resources.add(fr.unice.miage.ntdp.blog.services.UtilisateursFacadeREST.class);
        resources.add(org.netbeans.rest.application.config.RequestFilter.class);
    }
    
}
