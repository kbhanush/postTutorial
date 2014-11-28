var app = angular.module('app', ['ngRoute']);

angular.module('app')
    .config(function($routeProvider){
        $routeProvider.when('/', {controller: 'postsCtrl', templateUrl: 'posts.html'})
            .when('/register', {controller: 'registerCtrl', templateUrl: 'register.html'})
            .when('/login', {controller: 'loginCtrl', templateUrl: 'login.html'})
    });



angular.module('app')
    .controller('postsCtrl', function ($scope, $http) {

    $scope.addPost = function(){
        if ($scope.postBody) {
            $http.post('http://localhost:3000/api/posts', {username: 'kbhanush', body: $scope.postBody})
                .success(function(post){
                    $scope.posts.unshift(post);
                    $scope.postBody = null
                })

        }
    };


    $http.get('http://localhost:3000/api/posts').success(function(posts) {$scope.posts = posts})
});