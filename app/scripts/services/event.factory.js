/**
 * @ngdoc function
 * @name myApp.factory:eventFactory
 * @desc
 * # eventFactory
 * Factory used to handle events
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('eventFactory', eventFactory);

    /* @ngInject */
    function eventFactory($rootScope) {
        var factory = {
            broadcast: broadcast,
            broadcastError: broadcastError,
            broadcastSuccess: broadcastSuccess
        };

        return factory;

        function broadcast(eventName, message) {
            $rootScope.$broadcast(eventName, message);
        }

        function broadcastError(message) {
            $rootScope.$broadcast('error', message);
        }

        function broadcastSuccess(message) {
            $rootScope.$broadcast('success', message);
        }
    }
})();
