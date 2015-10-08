/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @description
 * # Login
 * Controller of the myApp
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl($scope, $state, userFactory) {
        var vm = this;
        vm.credentials = {};

        vm.login = function() {
            userFactory.login(vm.credentials)
                .then(function(response) {
                    userFactory.getUser()
                        .then(function(response) {
                            $scope.$emit('error', undefined);
                            $state.go('actions');
                        }, function(response) {
                            $scope.$emit('error',
                                'An error ocurred while logging in. Please try again later.');
                        });
                }, function(response) {
                    $scope.$emit('error',
                        'An error ocurred while logging in. Please try again later.');
                });
        };
    }
})();
