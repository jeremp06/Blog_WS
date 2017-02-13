'use strict';


/**
 * Déclaration de l'application routeApp
 */
 var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
    ]);

/**
 * Configuration du module principal : routeApp
 */
 routeApp.config(['$routeProvider',
 	function($routeProvider) { 

        // Système de routage
        $routeProvider
        .when('/home', {
        	templateUrl: 'pages/home.html',
        	controller: 'homeCtrl'
        })
        .when('/blog', {
        	templateUrl: 'pages/blog.html',
        	controller: 'blogCtrl'
        })
        .when('/register', {
        	templateUrl: 'pages/register.html',
        	controller: 'registerCtrl'
        })
        .when('/users', {
        	templateUrl: 'pages/users.html',
        	controller: 'usersCtrl'
        })
        .when('/activation', {
        	templateUrl: 'pages/activation.html',
        	controller: 'activationCtrl'
        })
        .when('/article/:id', {
        	templateUrl: 'pages/article.html',
        	controller: 'articleCtrl'
        })
        .when('/articles/:id', {
        	templateUrl: 'pages/articles.html',
        	controller: 'editArticleCtrl'
        })
        .when('/connexion', {
        	templateUrl: 'pages/connexion.html',
        	controller: 'cnxCtrl'
        })
        .otherwise({
        	redirectTo: '/blog'
        });
    }
    ]);

/**
 * Définition des contrôleurs
 */
 var routeAppControllers = angular.module('routeAppControllers', []);

// Contrôleur de la page de blog
routeAppControllers.controller('blogCtrl',
	function($scope, $http, $location){
		$scope.articles = [];
		

                //Chargement des données
                _refreshPageData();
                

                //HTTP DELETE- delete employee by Id
                $scope.removeArticle = function(article) {
                	$http({
                		method : 'DELETE',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/' + article.id
                	}).then(_success, _error);
                };


                /* Private Methods */
                //HTTP GET- get all employees collection
                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles'
                	}).then(function successCallback(response) {
                		$scope.articles = response.data;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }

                function _success(response) {
                	_refreshPageData();
                	_clearForm()
                }

                function _error(response) {
                	console.log(response.statusText);
                }
                
            }
            );

/*routeAppControllers.controller('cnxCtrl',
	function($scope, $http, $location){

		$scope.connexion = function() {
			$http({
				method : method,
				url : "http://localhost:8080/WS_Blog/webresources/entity.articles/connexion",
				data : angular.toJson($scope),
				headers : {
					'Content-Type' : 'application/json'
				}
			}).then(function successCallback(response) {
				alert("Succes :"+response.data);
				$scope.changeRoute('#/blog');
			}, function errorCallback(response) {
				alert("Echec");
				console.log(response.statusText);
			});
		}
	}
	);*/

// Controleur de l'édition/creation d'un article
routeAppControllers.controller('editArticleCtrl',
	function($scope, $http, $location, $routeParams){

		$scope.form = {
			id : -1,
			title : "",
			keywords : "",
			photo : "",
			position_longitude : "",
			position_latitude : "",
			position_name : "",
			content : "",
			status : ""
		};

			//Chargement des données
			_refreshPageData();

			//Quand on soumet le formularie pour creer ou modifier
			$scope.submitArticle = function() {

				var method = "";
				var url = "";
				if ($scope.form.id == -1) {
                        //Id is absent so add employee - POST operation
                        method = "POST";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.articles';
                    } else {
                        //If Id is present, it's edit operation - PUT operation
                        method = "PUT";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.articles/' + $scope.form.id;
                    }

                    $http({
                    	method : method,
                    	url : url,
                    	data : angular.toJson($scope.form),
                    	headers : {
                    		'Content-Type' : 'application/json'
                    	}
                    }).then( _success, _error );
                };

                /* Private Methods */
                //HTTP GET- get all employees collection
                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ $routeParams.id
                	}).then(function successCallback(response) {
                		$scope.article = response.data;
                		$scope.form.title = $scope.article.title;
                		$scope.form.keywords = $scope.article.keywords;
                		$scope.form.photo = $scope.article.photo;
                		$scope.form.position_longitude = $scope.article.position_longitude;
                		$scope.form.position_latitude = $scope.article.position_latitude;
                		$scope.form.position_name = $scope.article.position_name;
                		$scope.form.content = $scope.article.content;
                		$scope.form.status = $scope.article.status;
                		$scope.form.id = $scope.article.id;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }

                //Clear the form
                function _clearForm() {
                	$scope.form.title = "";
                	$scope.form.keywords = "";
                	$scope.form.photo = "";
                	$scope.form.position_longitude = "";
                	$scope.form.position_latitude = "";
                	$scope.form.position_name = "";
                	$scope.form.content = "";
                	$scope.form.status = "";
                	$scope.form.id = -1;
                };


                function _success(response) {
                	_refreshPageData();
                	_clearForm()
                }

                function _error(response) {
                	console.log(response.statusText);
                }
            }
            );

routeAppControllers.controller('articleCtrl',
	function($scope, $http, $location, $routeParams){

			//Chargement des données
			_refreshPageData();

			/* Private Methods */
                //HTTP GET- get all employees collection
                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ $routeParams.id
                	}).then(function successCallback(response) {
                		$scope.article = response.data;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }

                function _success(response) {
                	_refreshPageData();
                	_clearForm()
                }

                function _error(response) {
                	console.log(response.statusText);
                }
            }
            );

// Controleur de la page gestion utilisateurs
routeAppControllers.controller('usersCtrl',
	function($scope, $http, $location){
		$scope.users = [];

		_refreshPageData();

		$scope.submitUser = function() {

			var method = "";
			var url = "";
			if ($scope.form.id == -1) {
                        //Id is absent so add employee - POST operation
                        method = "POST";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs';
                    } else {
                        //If Id is present, it's edit operation - PUT operation
                        method = "PUT";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/' + $scope.form.id;
                    }

                    $http({
                    	method : method,
                    	url : url,
                    	data : angular.toJson($scope.form),
                    	headers : {
                    		'Content-Type' : 'application/json'
                    	}
                    }).then( _success, _error );
                };

                $scope.editUser = function() {
                	$scope.form.id = article.id;
                	$scope.form.title = article.title;
                	$scope.form.keywords = article.keywords;
                	$scope.form.photo = article.photo;
                	$scope.form.position_longitude = article.position_longitude;
                	$scope.form.position_latitude = article.position_latitude;
                	$scope.form.position_name = article.position_name;
                	$scope.form.status = article.status;
                }

                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs'
                	}).then(function successCallback(response) {
                		$scope.users = response.data;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }
            }
            );

routeAppControllers.controller('activationCtrl',
	function($scope, $http, $location){

		
			//Chargement des données
			_refreshPageDataUsers();
			_refreshPageDataArticles();

			function _refreshPageDataUsers() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs'
				}).then(function successCallback(response) {
					$scope.users = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}

			function _refreshPageDataArticles() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles'
				}).then(function successCallback(response) {
					$scope.articles = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}
		}

		);

