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
    function ActionCtrl($state, $sessionStorage, actions) {
        if ($sessionStorage.loggedUser) {
            var vm = this;
            vm.actions = actions;
        } else {
            $state.go('home', {}, {location: 'replace'});
        }
    }
})();
