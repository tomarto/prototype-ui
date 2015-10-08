/**
 * @ngdoc function
 * @name myApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the myApp
 */
 (function() {
    'use strict';

    angular
        .module('myApp')
        .controller('AppCtrl', AppCtrl);

    /* @ngInject */
    function AppCtrl($scope, $state, $cacheFactory, $sessionStorage, userFactory) {
        var vm = this;

        if ($sessionStorage.loggedUser) {
            vm.user = $sessionStorage.loggedUser;
        }

        vm.logout = function() {
            userFactory.logout()
                .then(function(response) {
                    delete $sessionStorage.loggedUser;
                    delete vm.user;
                    angular.forEach($cacheFactory.info(), function(item) {
                        if (item.id !== 'templates' && item.id.indexOf('$') !== 0) {
                            $cacheFactory.get(item.id).removeAll();
                        }
                    });
                    $scope.$broadcast('error', undefined);
                    $state.go('home', {}, {reload: true});
                }, function(response) {
                    $scope.$broadcast('error',
                        'An error ocurred while logging out. Please try again later');
                });
        };

        $scope.$on('login', function(event, user) {
            vm.user = user;
        });

        $scope.$on('error', function(event, message) {
            vm.errorMsg = message;
        });

        $scope.$on('success', function(event, message) {
            vm.successMsg = message;
        });

        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            vm.errorMsg = undefined;
            vm.successMsg = undefined;
        });
    }
})();
