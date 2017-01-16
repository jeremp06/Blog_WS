/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.blog;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.ws.rs.Path;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author edou
 */
@Entity
@Path("commentsEJB")
@XmlRootElement
public class Comments implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String comment;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date commented_date;
    @ManyToOne
    @JoinColumn
    private Utilisateurs authors;
    
    @ManyToOne
    @JoinColumn
    private Articles article;

    public Long getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getCommented_date() {
        return commented_date;
    }

    public void setCommented_date(Date commented_date) {
        this.commented_date = commented_date;
    }

    public Utilisateurs getAuthors() {
        return authors;
    }

    public void setAuthors(Utilisateurs authors) {
        this.authors = authors;
    }

    public Articles getArticle() {
        return article;
    }

    public void setArticle(Articles article) {
        this.article = article;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 89 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Comments other = (Comments) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
