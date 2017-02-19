Gestion de blog en ligne
========================

Pr�-requis
----------
1. Afin de faire fonctionner notre projet, il faut installer un plugin chrome (Web Server for Chrome pour nous) pour lancer le serveur web.
2. Il faut �galer installer le plugin Allow-Control-Allow-Origin: *
3. Ensuite, il faut lancer le WebService.
4. Afin de d�marrer avec des donn�es, voici notre script SQL : 
INSERT INTO ROLES(ID, DESCRIPTION, NAME) VALUES (1,'Admin','L administrateur peut valider des utilisateurs et des articles et les supprimer.');
INSERT INTO ROLES(ID, DESCRIPTION, NAME) VALUES (2,'Membre','Le memebre peut publier des articles, modifier ses articles et commenter.');

INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (101,'Etudiant en NTDP a la MIAGE de Sophia Antipolis.', 'Jeremy','2017-01-25', 'PINET', 'jp', 1, 'jp', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (201,'Etudiante en NTDP a la MIAGE de Sophia Antipolis.', 'Brenda','2017-01-26', 'BARBE', 'bb', 1, 'bb', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (301,'Professeur a la MIAGE de Sophia Antipolis.', 'Edouard','2017-01-26', 'AMOSSE', 'ea', 2, 'ea', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (401,'Etudiant en SIRIS a la MIAGE de Sophia Antipolis.', 'Steven','2017-02-02', 'GUERY', 'sg', 1, 'sg', 2);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (501,'Etudiant en SIRIS a la MIAGE de Sophia Antipolis.', 'Sebastien','2017-02-04', 'LANTIER', 'sl', 1, 'sl', 2);

INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (101, 'Nautulus est un site permettant de trouver de trouver un bateau. Une fois que vous avez trouver celui qui vous interesse, il est possible de le louer.', 'bateaux', './img/works/1.jpg', '43.583', '7.116', 'Antibes','2017-01-24', 0, 'Nautulus, les bateaux a portee de main', 101);
INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (201, 'Cet outil est destine aux etudiants en medecine. Il leur permettra d etudier differents cas avec de reelles mise en situation.', 'medecins', './img/works/2.jpg', '43.70', '7.25', 'Nice','2017-01-25', 1, 'Step1 Expert, l outil des futurs medecins', 101);
INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (301, 'Cette application mobile est destine a tous les citoyens souhaitant prendre soin de leur sante. Des graphiques permettent d avoir un apercu rapide et synthetique des differentes donnees entrees.', 'sante', './img/works/3.jpg', '48.35', '2.25', 'Paris','2017-02-01', 1, 'Suivi de sante', 401);

INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (101, 'J adore cette article !','2017-01-25',101,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (201, 'Ce lien est tr�s interessant :)','2017-01-27',101,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (301, 'Je n ai rien compris a cette application, je la deconseille.','2017-01-28',201,401);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (401, 'Le principe est original...','2017-02-02',301,501);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (501, 'C est une tr�s bonne idee !','2017-02-02',301,101);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (601, 'Je mets un commentaire car j aimerai un article plus detaille sur ce contenu.','2017-02-03',301,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (701, 'O� est-ce qu on put telecharger ca ?','2017-02-04',201,501);

Fonctionnalit�s
---------------
### Cas d'utilisation d'un admin
- R�viser un article avant de le publier sur le syst�me > En cliquant sur le titre depuis la page "En attente"
- Publier un article > En cliquant sur le V vert depuis la page "En attente"
- Refuser un article > En cliquant sur la X rouge depuis la page "En attente"
- Supprimer un article > En cliquant sur la poubelle en dessous de l'article concern� dans la page "Blog"
- Supprimer un article signal� > En cliquant sur la X rouge depuis la page "En attente"
- Accepter un utilisateur > En cliquant sur le V vert depuis la page "En attente"
- Refuser un utilisateur > En cliquant sur la X rouge depuis la page "En attente"

### Cas d'utilisation d'un utilisateur
#### Connect�
- Cr�er un article > En cliquant sur "Cr�er un article" dans la page "Blog"
- Editer un article qu'il a publi� > En cliquant sur le crayon sous l'article concern� dans "Mes articles" correspondant aux articles non publi�s de l'utilisateur 
- Commenter un article > En cliquant sur le titre de l'article concern� ou sur "Comments"
#### Non connect�
- Consulter un article > En cliquant sur le titre de l'article concern� ou sur "Comments"
- Cr�er un compte > En cliquant sur "Cr�er" dans la page connexion (l'ic�ne � droite)


Pr�cisions
----------
UTILISATEURS - Status
0 = En attente
1 = Accept�
2 = Refus�

UTILISATEURS - Role
1 = Admin
2 = Role

ARTICLE - Status
0 = En attente
1 = Accept�
2 = Refus�
3 = Signal�