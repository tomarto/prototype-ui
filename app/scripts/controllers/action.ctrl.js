/**
 * @ngdoc function
 * @name myApp.controller:ActionCtrl
 * @description
 * # ActionCtrl
 * Controller of the myApp
 */
 (function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ActionCtrl', ActionCtrl);

    /* @ngInject */
    function ActionCtrl($scope, $state, $sessionStorage, actions) {
        if ($sessionStorage.loggedUser) {
            var vm = this;
            if (actions.errorMessage) {
                $scope.$emit('error', actions.errorMessage);
            } else {
                vm.actions = actions;
            }
        } else {
            $state.go('home', {}, {location: 'replace'});
        }
    }
})();
