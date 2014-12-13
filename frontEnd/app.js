var app = angular.module('app', ['ngRoute']);

angular.module('app')
    .config(function($routeProvider){
        $routeProvider.when('/', {controller: 'postsCtrl', templateUrl: 'posts.html'})
            .when('/register', {controller: 'registerCtrl', templateUrl: 'register.html'})
            .when('/login', {controller: 'loginCtrl', templateUrl: 'login.html'})
    });


angular.module('app')
    .controller('applicationCtrl', function($scope,$rootScope, $location) {
        $scope.$on('login', function(_, user) {
            //alert(location.hostname)
            //$scope.currentUser = user
            $rootScope.currentUser = user
            $rootScope.hostname = location.hostname
        })
       if (!$scope.currentUser) {$location.path('/login')}


    });

//-------------------------------------------------- Post Controller -------------------------------------------------------------
angular.module('app')
    .controller('postsCtrl', function ($scope,$rootScope, $location, $http) {
   // if (!$rootScope.currentUser) {$location.path('/login')}

    $scope.addPost = function(){
        if ($scope.postBody) {
            $http.post('/api/posts', {username: $rootScope.currentUser.username, body: $scope.postBody})
                .success(function(post){
                    $scope.posts.unshift(post);
                    $scope.postBody = null
                })

        }
    };
    $http.get('/api/posts').success(function(posts) {$scope.posts = posts})
});

//------------------------------------------------End Post Controller ----------------------------------------------------------


angular.module('app')
    .controller('loginCtrl', function($scope, userSvc, $location) {
        $scope.login = function (username, password) {
            userSvc.login(username, password)

                .then(function (user) {

                    $scope.$emit('login', user)
                    $location.path('/')
                })


        }

    })


angular.module('app')
    .controller('registerCtrl', function($scope, userSvc, $location){
        $scope.register = function(firstname, lastname, cellphone, username, password) {

            userSvc.signup(firstname, lastname, cellphone, username, password)
                .then(function(res){
                   console.log('Signup successful!')
                    $location.path('/')

                })
        }

    })


angular.module('app')
    .service('userSvc', function($http) {

        this.login = function (username, password) {

            return $http.post('/login', {username: username, password: password}).then(function (response) {

                return response.data
            })
        };

        this.signup = function (firstname, lastname, cellphone, username, password) {

            return $http.post('/register', {firstname: firstname, lastname: lastname, cellphone: cellphone, username: username, password: password}).then(function (response) {

                return response.data
            })

        };

    })
