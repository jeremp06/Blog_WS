/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.resource.spi.AuthenticationMechanism;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Jeremy
 */
@Entity
@Table(name = "ARTICLES")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Articles.findAll", query = "SELECT a FROM Articles a"),
    @NamedQuery(name = "Articles.findById", query = "SELECT a FROM Articles a WHERE a.id = :id"),
    @NamedQuery(name = "Articles.findByKeywords", query = "SELECT a FROM Articles a WHERE a.keywords = :keywords"),
    @NamedQuery(name = "Articles.findByPhoto", query = "SELECT a FROM Articles a WHERE a.photo = :photo"),
    @NamedQuery(name = "Articles.findByPositionLatitude", query = "SELECT a FROM Articles a WHERE a.positionLatitude = :positionLatitude"),
    @NamedQuery(name = "Articles.findByPositionLongitude", query = "SELECT a FROM Articles a WHERE a.positionLongitude = :positionLongitude"),
    @NamedQuery(name = "Articles.findByPositionName", query = "SELECT a FROM Articles a WHERE a.positionName = :positionName"),
    @NamedQuery(name = "Articles.findByPublishedOn", query = "SELECT a FROM Articles a WHERE a.publishedOn = :publishedOn"),
    @NamedQuery(name = "Articles.findByStatus", query = "SELECT a FROM Articles a WHERE a.status = :status"),
    @NamedQuery(name = "Articles.findByTitle", query = "SELECT a FROM Articles a WHERE a.title = :title")})
public class Articles implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Size(max = 255)
    @Column(name = "KEYWORDS")
    private String keywords;
    @Size(max = 255)
    @Column(name = "PHOTO")
    private String photo;
    @Size(max = 255)
    @Column(name = "POSITION_LATITUDE")
    private String positionLatitude;
    @Size(max = 255)
    @Column(name = "POSITION_LONGITUDE")
    private String positionLongitude;
    @Size(max = 255)
    @Column(name = "POSITION_NAME")
    private String positionName;
    @Size(max = 255)
    @Column(name = "PUBLISHED_ON")
    private String publishedOn;
    @Column(name = "STATUS")
    private Integer status;
    @Size(max = 255)
    @Column(name = "TITLE")
    private String title;
    @OneToMany(mappedBy = "articleId")
    private Collection<Comments> commentsCollection;
    @OneToMany(mappedBy = "articleId")
    private Collection<Utilisateurs> utilisateursCollection;

    public Articles() {
    }

    public Articles(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getPositionLatitude() {
        return positionLatitude;
    }

    public void setPositionLatitude(String positionLatitude) {
        this.positionLatitude = positionLatitude;
    }

    public String getPositionLongitude() {
        return positionLongitude;
    }

    public void setPositionLongitude(String positionLongitude) {
        this.positionLongitude = positionLongitude;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getPublishedOn() {
        return publishedOn;
    }

    public void setPublishedOn(String publishedOn) {
        this.publishedOn = publishedOn;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @XmlTransient
    public Collection<Comments> getCommentsCollection() {
        return commentsCollection;
    }

    public void setCommentsCollection(Collection<Comments> commentsCollection) {
        this.commentsCollection = commentsCollection;
    }

    @XmlTransient
    public Collection<Utilisateurs> getUtilisateursCollection() {
        return utilisateursCollection;
    }

    public void setUtilisateursCollection(Collection<Utilisateurs> utilisateursCollection) {
        this.utilisateursCollection = utilisateursCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Articles)) {
            return false;
        }
        Articles other = (Articles) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Articles[ id=" + id + " ]";
    }
    
}
