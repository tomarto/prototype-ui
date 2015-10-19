/**
 * @ngdoc function
 * @name myApp.controller:ActionCtrl
 * @desc
 * # ActionCtrl
 * Controller for Actions
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ActionCtrl', ActionCtrl);

    /* @ngInject */
    function ActionCtrl($state, $sessionStorage, actions, eventFactory) {
        var vm = this;

        activate();

        function activate() {
            if ($sessionStorage.loggedUser) {
                if (actions.errorMessage) {
                    eventFactory.broadcastError(actions.errorMessage);
                } else {
                    vm.actions = actions;
                }
            } else {
                $state.go('home', {}, {location: 'replace'});
            }
        }
    }
})();
