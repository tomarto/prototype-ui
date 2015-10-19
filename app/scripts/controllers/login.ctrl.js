/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @desc
 * # Login
 * Controller to login to myApp
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl($state, config, eventFactory, userFactory) {
        var vm = this;

        vm.credentials = {};

        vm.login = login;

        function login() {
            userFactory.login(vm.credentials)
                .then(function(response) {
                    userFactory.getUser()
                        .then(function(response) {
                            eventFactory.broadcastError(undefined);
                            $state.go('actions');
                        }, function(response) {
                            eventFactory.broadcastSuccess(undefined);
                            eventFactory.broadcastError(config.login.error);
                        });
                }, function(response) {
                    eventFactory.broadcastSuccess(undefined);
                    eventFactory.broadcastError(config.login.error);
                });
        }
    }
})();
