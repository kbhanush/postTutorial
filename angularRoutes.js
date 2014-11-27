/**
 * Created by kbhanush on 11/12/2014.
 */
angular.module('app')
.config(function($routeProvider){
        $routeProvider.when('/', {controller: 'postCtrl', templateUrl: 'posts.html'})
                      .when('/register', {controller: 'registerCtrl', templateUrl: 'register.html'})
                      .when('/login', {controller: 'loginCtrl', templateUrl: 'login.html'})
    });