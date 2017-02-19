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
 	function($routeProvider, $scope) {

        // Système de routage
        $routeProvider
        .when('/home', {
        	templateUrl: 'pages/home.html'
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
        .when('/myarticles', {
        	templateUrl: 'pages/myArticles.html',
        	controller: 'editMyArticleCtrl'
        })
        .when('/connexion', {
        	templateUrl: 'pages/connexion.html',
        	controller: 'cnxCtrl'
        })
        .otherwise({
        	redirectTo: '/home'
        });
    }
    ]);

 routeApp.factory(function($scope){
 	window.sessionStorage.removeItem("currentUser");
 	$scope.currentUser = null;
 });

// Définition des contrôleurs
var routeAppControllers = angular.module('routeAppControllers', []);

////////////////////////////////////
///////// Controller blog //////////
////////////////////////////////////
routeAppControllers.controller('blogCtrl',
	function($scope, $http, $location){
		$scope.articles = [];
		$scope.currentUser = JSON.parse(window.sessionStorage.getItem("currentUser"));

                //Chargement des données
                _refreshPageData();
                
                function submitArticle(article) {
                	$http({
                		method : 'PUT',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ article.id,
                		data : angular.toJson(article),
                		headers : {
                			'Content-Type' : 'application/json'
                		}
                	}).then(function successCallback(response) {
                		_refreshPageData();
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }

                //HTTP DELETE- delete employee by Id
                $scope.removeArticle = function(article) {
                	$http({
                		method : 'DELETE',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/' + article.id
                	}).then(_success, _error);
                };

                $scope.signalArticle = function(article) {
                	article.status = 3;
                	submitArticle(article);
                }


                /* Private Methods */
                //HTTP GET- get all employees collection
                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/status/1'
                	}).then(function successCallback(response) {
                		$scope.articles = response.data;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }
                
            }
            );

/////////////////////////////////////////
///////// Controller myArticle //////////
////////////////////////////////////////
routeAppControllers.controller('editMyArticleCtrl',
	function($scope, $http, $location){
		$scope.articles = [];
		$scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
                //Chargement des données
                if($scope.currentUser != null){
                    _refreshPageData();
                }
                
                /* Private Methods */
                //HTTP GET- get all employees collection
                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/articles/' + $scope.currentUser.id
                	}).then(function successCallback(response) {
                         for(var i = 0; i < response.data.length; i++) {
                            if (response.data[i].status != 1){
                                $scope.articles[$scope.articles.length] = response.data[i];
                            }
                         }
                         
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                }
                
            }
            );

/////////////////////////////////////////
///////// Controller connexion //////////
/////////////////////////////////////////
routeAppControllers.controller('cnxCtrl',
	function($scope, $http, $location){

		$scope.connexion = function() {
			$http({
				method : 'POST',
				url : "http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/connexion",
				data : angular.toJson($scope.u),
				headers : {
					'Content-Type' : 'application/json'
				}
			}).then(function successCallback(response) {
				window.sessionStorage.setItem("currentUser", JSON.stringify(response.data));
                alert(window.sessionStorage.getItem("currentUser"));
				$location.path('#/blog');
			}, function errorCallback(response) {
				console.log(response.statusText);
			});
		}
	}
	);

/////////////////////////////////////////
///////// Controller register //////////
/////////////////////////////////////////
routeAppControllers.controller('registerCtrl',
	function($scope, $http, $location){
$scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
		$scope.register = function() {
			$http({
				method : 'POST',
				url : "http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/",
				data : angular.toJson($scope.form),
				headers : {
					'Content-Type' : 'application/json'
				}
			}).then(function successCallback(response) {
				window.sessionStorage.setItem("currentUser", JSON.stringify(response.data));
				$location.path('#/blog');
			}, function errorCallback(response) {
				console.log(response.statusText);
			});
		}
	}
	);

///////////////////////////////////////////////////
///////// Controller edit/create article //////////
///////////////////////////////////////////////////
routeAppControllers.controller('editArticleCtrl',
	function($scope, $http, $location, $routeParams){

        $scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
		$scope.form = {
			id : -1,
			title : "",
			keywords : "",
			photo : "",
			positionName : "",
            positionLatitude : "",
            positionLongitude : "",
			content : "",
			status : 0,
			publishedOn : "",
			utilisateur: {}
		};

			//Chargement des données
			_refreshPageData();

			//Quand on soumet le formularie pour creer ou modifier
			$scope.submitArticle = function() {
				var method = "";
				var url = "";
				if ($scope.form.id == -1) {
                    alert($scope.form.id)
                        //Id is absent so add employee - POST operation
                        method = "POST";
                        $scope.form.id = "";
                        $scope.form.publishedOn = new Date();
                        $scope.form.utilisateur = JSON.parse(window.sessionStorage.getItem("currentUser"));
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.articles';
                    } else {
                        alert($scope.form.id)
                        //If Id is present, it's edit operation - PUT operation
                        method = "PUT";
                        
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.articles/' + $scope.form.id;
        
                            $scope.form.id = $scope.article.id;

                        }
                                  
                    if ($scope.article != null && $scope.form.id == $scope.article.id) {
                        var promise = $http.get('http://localhost:8080/WS_Blog/webresources/entity.articles/utilisateur/idArticle/'+$scope.form.id);

                       promise.then(function(data) {

                        $scope.article.utilisateur = data.data;
                        alert(JSON.stringify( $scope.article));
                        $http({
                        	method : method,
                        	url : url,
                        	data : angular.toJson($scope.article),
                        	headers : {
                        		'Content-Type' : 'application/json'
                        	}
                        }).then(function successCallback(response) {
                        	$location.path('#/blog');
                        }, function errorCallback(response) {
                        	console.log(response.statusText);
                        });
                    });
                    }else if($scope.article == null){
                        alert(JSON.stringify($scope.form));
                        $http({
                            method : method,
                            url : url,
                            data : angular.toJson($scope.form),
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        }).then(function successCallback(response) {
                            $location.path('#/blog');
                        }, function errorCallback(response) {
                            console.log(response.statusText);
                        });
                    }
                };

                function _refreshPageData() {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ $routeParams.id
                	}).then(function successCallback(response) {
                		if($routeParams.id == -1){
                			_clearForm();
                		} else {
                			$scope.article = response.data;
                            alert(JSON.stringify($scope.article));
                			$scope.form.title = $scope.article.title;
                			$scope.form.keywords = $scope.article.keywords;
                			$scope.form.photo = $scope.article.photo;
                			$scope.form.positionName = $scope.article.positionName;

                            $scope.form.positionLatitude =parseFloat($scope.article.positionLatitude);
                            $scope.form.positionLongitude =parseFloat($scope.article.positionLongitude);
                			$scope.form.content = $scope.article.content;
                			$scope.form.id = $scope.article.id;
                		}
                	}, function errorCallback(response) {
                		console.log(response.statusText);

                	});
                }

                //Clear the form
                function _clearForm() {
                	$scope.form.title = "";
                	$scope.form.keywords = "";
                	$scope.form.photo = "";
                	$scope.form.positionName = "";
                	$scope.form.content = "";
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



/////////////////////////////////////////////////
///////// Controller affichage article //////////
/////////////////////////////////////////////////
routeAppControllers.controller('articleCtrl',
	function($scope, $http, $location, $routeParams){
  
			//Chargement des données
			_refreshPageData();
			var currentComment = {};
            $scope.comments = {};
			var articleId = $routeParams.id;
            $scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
			$scope.submitComment = function() {

                alert($scope.article.id);
				currentComment.comment = $scope.form.userComment;
				currentComment.commentedDate = new Date();
				var promise = $http.get('http://localhost:8080/WS_Blog/webresources/entity.articles/'+$routeParams.id);

                       

				currentComment.utilisateur = JSON.parse(window.sessionStorage.getItem("currentUser"));
				

                promise.then(function(data) {
                    currentComment.articleId = data.data;
                    alert(JSON.stringify(currentComment));
    				$http({
    					method : 'POST',
    					url : 'http://localhost:8080/WS_Blog/webresources/entity.comments',
    					data : angular.toJson(currentComment),
    					headers : {
    						'Content-Type' : 'application/json'
    					}
    				}).then(function successCallback(response) {
    					JSON.stringify(response);
    					_getComments();
    				}, function errorCallback(response) {
    					console.log(response.statusText);
    				});
    			});
			};

			function _refreshPageData() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ $routeParams.id
				}).then(function successCallback(response) {
					$scope.article = response.data;
					articleId = $scope.article.id;
					_getComments();
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
                $http({
                    method : 'GET',
                    url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/utilisateur/'+ $routeParams.id
                }).then(function successCallback(response) {
                    $scope.userArticle = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
                $http({
                    method : 'GET',
                    url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ $routeParams.id
                }).then(function successCallback(response) {
                    $scope.article = response.data;
                    articleId = $scope.article.id;
                    _getComments();
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
			}

			function _getComments() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.comments'
				}).then(function successCallback(response) {
                    alert(JSON.stringify(response.data));
                    var j = 0;
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].articleId.id == $routeParams.id ){
                            $scope.comments[j++] = response.data[i];
                        }
                    }
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}


			function _getArticle(id) {
				var article = {};

				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ id
				}).then(function successCallback(response) {
					article = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
				return article;
			}
		}
		);

/////////////////////////////////////////////
///////// Controller gestion users //////////
/////////////////////////////////////////////
routeAppControllers.controller('usersCtrl',
	function($scope, $http, $location){
		$scope.users = [];

        $scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
		var currentUser = {};

		$scope.form = {
			id : -1,
			lastname : "",
			firstname : "",
			about: "",
			username : ""
		};

		_refreshPageData();

		$scope.submitUser = function() {

			var method = "";
            var url ="";
            
			if ($scope.form.id == -1) {
                        //Id is absent so add employee - POST operation
                        method = "POST";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs';
                    } else {
                        //If Id is present, it's edit operation - PUT operation
                        method = "PUT";
                        url = 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/' + $scope.form.id;
                    }
                        currentUser.lastname = $scope.form.lastname;
                        currentUser.firstname = $scope.form.firstname;
                        currentUser.about = $scope.form.about;
                        currentUser.password = $scope.form.password;
                        currentUser.username = $scope.form.username;

                        

                        var promise = $http.get('http://localhost:8080/WS_Blog/webresources/entity.roles/'+$scope.form.role);

                       promise.then(function(data) {
                        currentUser.roleId = data.data;

                        alert(JSON.stringify(currentUser));
                               $http({
                                method : method,
                                url : url,
                                data : angular.toJson(currentUser),
                                headers : {
                                    'Content-Type' : 'application/json'
                                }
                            }).then(function successCallback(response) {
                                _refreshPageData();
                            }, function errorCallback(response) {
                                console.log(response.statusText);
                            });
                        });
                 };
                $scope.editUser = function(user) {
                   currentUser = user;
                	$scope.form.id = user.id;
                	$scope.form.lastname = user.lastname;
                	$scope.form.firstname = user.firstname;
                	$scope.form.about = user.about;
                	$scope.form.password = user.password;
                	$scope.form.username = user.username;
                    $scope.form.role = user.role;
                }

                function getUser(id) {
                	$http({
                		method : 'GET',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/'+ id
                	}).then(function successCallback(response) {
                		currentUser = response.data;
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
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

                $scope.removeUser = function(user) {
                	$http({
                		method : 'DELETE',
                		url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/' + user.id
                	}).then(function successCallback(response) {
                		_refreshPageData();
                	}, function errorCallback(response) {
                		console.log(response.statusText);
                	});
                };
            }
            );

////////////////////////////////////////////////////////////////////
///////// Controller supp, acept, refuse user and article /////////
///////////////////////////////////////////////////////////////////
routeAppControllers.controller('activationCtrl',
	function($scope, $http, $location){
            $scope.currentUser =  JSON.parse(window.sessionStorage.getItem("currentUser"));
		
			//Chargement des données
			_refreshPageDataUsers();
			_refreshPageDataBadArticles();
			_refreshPageDataArticles();

			function _refreshPageDataUsers() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/status/0'
				}).then(function successCallback(response) {
					$scope.users = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}

			function _refreshPageDataBadArticles() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/status/3'
				}).then(function successCallback(response) {
					$scope.articlesSignales = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}

			function _refreshPageDataArticles() {
				$http({
					method : 'GET',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/status/0'
				}).then(function successCallback(response) {
					$scope.articles = response.data;
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}

			$scope.activeUser = function(user) {
				user.status = 1;
				submitUser(user);
			}

			$scope.refuseUser = function(user) {
				user.status = 2;
				submitUser(user);
			}

			$scope.activeArticle = function(article) {
				article.status = 1;
				submitArticle(article);
			}

			$scope.refuseArticle = function(article) {
				article.status = 2;
				submitArticle(article);
			}

			function submitUser(user) {
				$http({
					method : 'PUT',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.utilisateurs/' + user.id,
					data : angular.toJson(user),
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function successCallback(response) {
					_refreshPageDataUsers();
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}

			function submitArticle(article) {
				$http({
					method : 'PUT',
					url : 'http://localhost:8080/WS_Blog/webresources/entity.articles/'+ article.id,
					data : angular.toJson(article),
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function successCallback(response) {
					_refreshPageDataArticles();
					_refreshPageDataBadArticles();
				}, function errorCallback(response) {
					console.log(response.statusText);
				});
			}
		}

		);

