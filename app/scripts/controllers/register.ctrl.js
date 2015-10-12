/**
 * @ngdoc function
 * @name myApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the myApp
 */
 (function() {
    'use strict';
    angular
        .module('myApp')
        .controller('RegisterCtrl', RegisterCtrl);

    /* @ngInject */
    function RegisterCtrl($scope, $state, $filter, userFactory) {
        var vm = this;
        vm.registerData = {};
        vm.maxDate = new Date();
        vm.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        vm.status = {
            opened: false
        };

        vm.open = function($event) {
            vm.status.opened = true;
        };

        vm.register = function(registerForm) {
            if (registerForm.$valid) {
                userFactory.register(vm.registerData)
                    .then(function(response) {
                        $scope.$emit('error', undefined);
                        $state.go('login');
                        $scope.$emit('success', 'You have been successfully registered.');
                    }, function(response) {
                        $scope.$emit('error', response.errorMessage ? response.errorMessage :
                            'An error ocurred while trying to register user. Please try again later.');
                    });
            }
        };
    }
})();
