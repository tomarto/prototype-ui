/**
 * @ngdoc overview
 * @name myApp
 * @desc
 * # myApp
 * Main module of the application.
 */
(function() {
    'use strict';

    angular
        .module('myApp', [
            'ui.router',
            'ui.bootstrap',
            'ngStorage',
            'treasure-overlay-spinner'
        ])
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'registerCtrl'
            })
            .state('actions', {
                url: '/actions?searchId',
                templateUrl: 'views/actions.html',
                controller: 'ActionCtrl',
                controllerAs: 'actionCtrl',
                resolve: {
                    actions: function(actionFactory, $stateParams) {
                        return actionFactory.getActions($stateParams.searchId);
                    }
                }
            });
        $urlRouterProvider.otherwise('home');
    }
})();
