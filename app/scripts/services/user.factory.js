/**
 * @ngdoc function
 * @name myApp.factory:userFactory
 * @desc
 * # userFactory
 * Factory related to user actions
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('userFactory', userFactory);

    /* @ngInject */
    function userFactory($http, $q, $httpParamSerializerJQLike, $sessionStorage,
                config, eventFactory) {
        var factory = {
            getUser: getUser,
            login: login,
            logout: logout,
            register: register
        };

        return factory;

        function getUser() {
            var deferred = $q.defer(),
                requestObj = {
                    url: config.api.user.get,
                    method: 'POST',
                    data: {}
                };

            if ($sessionStorage.loggedUser) {
                deferred.resolve($sessionStorage.loggedUser);
            } else {
                $http(requestObj)
                    .then(function(response) {
                        $sessionStorage.loggedUser = response.data.result;
                        eventFactory.broadcast('login', response.data.result);
                        deferred.resolve(response.data.result);
                    }, function(response) {
                        deferred.reject(response.data);
                    });
            }

            return deferred.promise;
        }

        function login(credentials) {
            var deferred = $q.defer(),
                requestObj = {
                    url: config.api.user.login,
                    method: 'POST',
                    data: $httpParamSerializerJQLike(credentials),
                    headers : {
                        'content-type' : 'application/x-www-form-urlencoded'
                    }
                };

            delete $sessionStorage.loggedUser;
            $http(requestObj)
                .then(function(response) {
                    deferred.resolve('Success');
                }, function(response) {
                    deferred.reject('Error');
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer(),
                requestObj = {
                    url: config.api.user.logout,
                    method: 'POST',
                    data: {}
                };

            delete $sessionStorage.loggedUser;
            $http(requestObj)
                .then(function(response) {
                    deferred.resolve('Success');
                }, function(response) {
                    deferred.reject('Error');
                });

            return deferred.promise;
        }

        function register(registerData) {
            var deferred = $q.defer(),
                requestObj = {
                    url: config.api.user.register,
                    method: 'POST',
                    data: registerData
                };

            $http(requestObj)
                .then(function(response) {
                    deferred.resolve(response.data.result);
                }, function(response) {
                    deferred.reject(response.data);
                });

            return deferred.promise;
        }
    }
})();
