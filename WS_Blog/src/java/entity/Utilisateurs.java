/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Jeremy
 */
@Entity
@Table(name = "UTILISATEURS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Utilisateurs.findAll", query = "SELECT u FROM Utilisateurs u"),
    @NamedQuery(name = "Utilisateurs.findById", query = "SELECT u FROM Utilisateurs u WHERE u.id = :id"),
    @NamedQuery(name = "Utilisateurs.findByAbout", query = "SELECT u FROM Utilisateurs u WHERE u.about = :about"),
    @NamedQuery(name = "Utilisateurs.findByFirstname", query = "SELECT u FROM Utilisateurs u WHERE u.firstname = :firstname"),
    @NamedQuery(name = "Utilisateurs.findByLastname", query = "SELECT u FROM Utilisateurs u WHERE u.lastname = :lastname"),
    @NamedQuery(name = "Utilisateurs.findByLastConnected", query = "SELECT u FROM Utilisateurs u WHERE u.lastConnected = :lastConnected"),
    @NamedQuery(name = "Utilisateurs.findByPassword", query = "SELECT u FROM Utilisateurs u WHERE u.password = :password"),
    @NamedQuery(name = "Utilisateurs.findByStatus", query = "SELECT u FROM Utilisateurs u WHERE u.status = :status"),
    @NamedQuery(name = "Utilisateurs.findByUsername", query = "SELECT u FROM Utilisateurs u WHERE u.username = :username")})
public class Utilisateurs implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Size(max = 255)
    @Column(name = "ABOUT")
    private String about;
    @Size(max = 255)
    @Column(name = "FIRSTNAME")
    private String firstname;
    @Size(max = 255)
    @Column(name = "LASTNAME")
    private String lastname;
    @Column(name = "LAST_CONNECTED")
    @Temporal(TemporalType.DATE)
    private Date lastConnected;
    @Size(max = 255)
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "STATUS")
    private Integer status;
    @Size(max = 255)
    @Column(name = "USERNAME")
    private String username;
    @ManyToMany(mappedBy = "utilisateursCollection")
    private Collection<Comments> commentsCollection;
    @ManyToMany(mappedBy = "utilisateursCollection")
    private Collection<Roles> rolesCollection;
    @OneToMany(mappedBy = "authorsId")
    private Collection<Comments> commentsCollection1;
    @JoinColumn(name = "ARTICLE_ID", referencedColumnName = "ID")
    @ManyToOne
    private Articles articleId;
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")
    @ManyToOne
    private Roles roleId;

    public Utilisateurs() {
    }

    public Utilisateurs(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getLastConnected() {
        return lastConnected;
    }

    public void setLastConnected(Date lastConnected) {
        this.lastConnected = lastConnected;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @XmlTransient
    public Collection<Comments> getCommentsCollection() {
        return commentsCollection;
    }

    public void setCommentsCollection(Collection<Comments> commentsCollection) {
        this.commentsCollection = commentsCollection;
    }

    @XmlTransient
    public Collection<Roles> getRolesCollection() {
        return rolesCollection;
    }

    public void setRolesCollection(Collection<Roles> rolesCollection) {
        this.rolesCollection = rolesCollection;
    }

    @XmlTransient
    public Collection<Comments> getCommentsCollection1() {
        return commentsCollection1;
    }

    public void setCommentsCollection1(Collection<Comments> commentsCollection1) {
        this.commentsCollection1 = commentsCollection1;
    }

    public Articles getArticleId() {
        return articleId;
    }

    public void setArticleId(Articles articleId) {
        this.articleId = articleId;
    }

    public Roles getRoleId() {
        return roleId;
    }

    public void setRoleId(Roles roleId) {
        this.roleId = roleId;
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
        if (!(object instanceof Utilisateurs)) {
            return false;
        }
        Utilisateurs other = (Utilisateurs) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Utilisateurs[ id=" + id + " ]";
    }
    
}
