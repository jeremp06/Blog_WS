Gestion de blog en ligne
========================

Pré-requis
----------
1. Afin de faire fonctionner notre projet, il faut installer un plugin chrome (Web Server for Chrome pour nous) pour lancer le serveur web.
2. Ensuite, il faut lancer le WebService.
3. Afin de démarrer avec des données, voici notre script SQL : 
INSERT INTO ROLES(ID, DESCRIPTION, NAME) VALUES (1, 'Admin ', 'L administrateur peut valider des utilisateurs et des articles et les supprimer. ');
INSERT INTO ROLES(ID, DESCRIPTION, NAME) VALUES (2, 'Membre ', 'Le memebre peut publier des articles, modifier ses articles et commenter. ');

INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (101, 'Etudiant en NTDP à la MIAGE de Sophia Antipolis. ',  'Jeremy ', '2017-01-25',  'PINET ',  'jp ', 1,  'jp ', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (201, 'Etudiante en NTDP à la MIAGE de Sophia Antipolis. ',  'Brenda ', '2017-01-26',  'BARBE ',  'bb ', 1,  'bb ', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (301, 'Professeur à la MIAGE de Sophia Antipolis. ',  'Edouard ', '2017-01-26',  'AMOSSE ',  'ea ', 2,  'ea ', 1);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (401, 'Etudiant en SIRIS à la MIAGE de Sophia Antipolis. ',  'Steven ', '2017-02-02',  'GUERY ',  'sg ', 1,  'sg ', 2);
INSERT INTO UTILISATEURS(ID, ABOUT, FIRSTNAME, LAST_CONNECTED, LASTNAME, PASSWORD, STATUS, USERNAME, ROLE_ID) VALUES (501, 'Etudiant en SIRIS à la MIAGE de Sophia Antipolis. ',  'Sebastien ', '2017-02-04',  'LANTIER ',  'sl ', 1,  'sl ', 2);

INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (101,  'Nautulus est un site permettant de trouver de trouver un bâteau. Une fois que vous avez trouver celui qui vous intéresse, il est possible de le louer. ',  'bateaux ',  './img/works/1.jpg ',  '43.583 ',  '7.116 ',  'Antibes ', '2017-01-24', 1,  'Nautulus, les bateaux à portée de main ', 101);
INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (201,  'Cet outil est destiné aux étudiants en médecine. Il leur permettra d étudier différents cas avec de réelles mise en situation. ',  'médecins ',  './img/works/2.jpg ',  '43.70 ',  '7.25 ',  'Nice ', '2017-01-25', 1,  'Step1 Expert, l outil des futurs médecins ', 101);
INSERT INTO ARTICLES(ID, CONTENT, KEYWORDS, PHOTO, POSITION_LATITUDE, POSITION_LONGITUDE, POSITION_NAME, PUBLISHED_ON, STATUS, TITLE, UTILISATEUR_ID) VALUES (301,  'Cette application mobile est destiné à tous les citoyens souhaitant prendre soin de leur santé. Des graphiques permettent d avoir un aperçu rapide et synthétique des différentes données entrées. ',  'santé ',  './img/works/3.jpg ',  '48.853 ',  '2.35 ',  'Paris ', '2017-02-01', 1,  'Suivi de santé ', 401);

INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (101,  'J adore cette article ! ','2017-01-25',101,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (201,  'Ce lien est très intéressant :) ','2017-01-27',101,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (301,  'Je n ai rien compris à cette application, je la déconseille. ','2017-01-28',201,401);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (401,  'Le principe est original... ','2017-02-02',301,501);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (501,  'C est une très bonne idée ! ','2017-02-02',301,101);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (601,  'Je mets un commentaire car j aimerai un article plus détaillé sur ce contenu. ','2017-02-03',301,201);
INSERT INTO COMMENTS(ID, COMMENT, COMMENTED_DATE, ARTICLE_ID, UTILISATEUR_ID) VALUES (701,  'Où est-ce qu on put télécharger ça ? ','2017-02-04',201,501);

Fonctionnalités
---------------
### Cas d'utilisation d'un admin
- Réviser un article avant de le publier sur le système > En cliquant sur le titre depuis la page "En attente"
- Publier un article > En cliquant sur le V vert depuis la page "En attente"
- Refuser un article > En cliquant sur la X rouge depuis la page "En attente"
- Supprimer un article > En cliquant sur la poubelle en dessous de l'article concerné dans la page "Blog"
- Supprimer un article signalé > En cliquant sur la X rouge depuis la page "En attente"
- Accepter un utilisateur > En cliquant sur le V vert depuis la page "En attente"
- Refuser un utilisateur > En cliquant sur la X rouge depuis la page "En attente"

### Cas d'utilisation d'un utilisateur
#### Connecté
- Créer un article > En cliquant sur "Créer un article" dans la page "Blog"
- Editer un article qu'il a publié > En cliquant sur le crayon sous l'article concerné dans "Mes articles" correspondant aux articles non publiés de l'utilisateur 
- Commenter un article > En cliquant sur le titre de l'article concerné ou sur "Comments"
#### Non connecté
- Consulter un article > En cliquant sur le titre de l'article concerné ou sur "Comments"
- Créer un compte > En cliquant sur "Créer" dans la page connexion (l'icône à droite)


Précisions
----------
UTILISATEURS - Status
0 = En attente
1 = Accepté
2 = Refusé

UTILISATEURS - Role
1 = Admin
2 = Role

ARTICLE - Status
0 = En attente
1 = Accepté
2 = Refusé
3 = Signalé