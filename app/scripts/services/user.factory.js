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
                config, eventFactory, pendingRequestFactory) {
        var factory = {
            getUser: getUser,
            login: login,
            logout: logout,
            register: register
        };

        return factory;

        function getUser() {
            var deferred = $q.defer(),
                request,
                requestOptions;

            if ($sessionStorage.loggedUser) {
                deferred.resolve($sessionStorage.loggedUser);
            } else {
                request = pendingRequestFactory.register();
                requestOptions = {
                    url: config.api.user.get,
                    method: 'POST',
                    data: {},
                    timeout: request.timeoutPromise
                };

                $http(requestOptions)
                    .then(function(response) {
                        $sessionStorage.loggedUser = response.data.result;
                        eventFactory.broadcast('login', response.data.result);
                        deferred.resolve(response.data.result);
                        pendingRequestFactory.complete(request);
                    }, function(response) {
                        deferred.reject(response.data);
                        pendingRequestFactory.complete(request);
                    });
            }

            return deferred.promise;
        }

        function login(credentials) {
            var deferred = $q.defer(),
                request,
                requestOptions;

            delete $sessionStorage.loggedUser;

            request = pendingRequestFactory.register();
            requestOptions = {
                url: config.api.user.login,
                method: 'POST',
                data: $httpParamSerializerJQLike(credentials),
                headers : {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                timeout: request.timeoutPromise
            };

            $http(requestOptions)
                .then(function(response) {
                    deferred.resolve('Success');
                    pendingRequestFactory.complete(request);
                }, function(response) {
                    deferred.reject('Error');
                    pendingRequestFactory.complete(request);
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer(),
                request,
                requestOptions = {
                    url: config.api.user.logout,
                    method: 'POST',
                    data: {}
                };

            delete $sessionStorage.loggedUser;

            request = pendingRequestFactory.register();
            requestOptions = {
                url: config.api.user.logout,
                method: 'POST',
                data: {},
                timeout: request.timeoutPromise
            };

            $http(requestOptions)
                .then(function(response) {
                    deferred.resolve('Success');
                    pendingRequestFactory.complete(request);
                }, function(response) {
                    deferred.reject('Error');
                    pendingRequestFactory.complete(request);
                });

            return deferred.promise;
        }

        function register(registerData) {
            var deferred = $q.defer(),
                request,
                requestOptions = {
                    url: config.api.user.register,
                    method: 'POST',
                    data: registerData
                };

            request = pendingRequestFactory.register();
            requestOptions = {
                url: config.api.user.register,
                method: 'POST',
                data: registerData,
                timeout: request.timeoutPromise
            };

            $http(requestOptions)
                .then(function(response) {
                    deferred.resolve(response.data.result);
                    pendingRequestFactory.complete(request);
                }, function(response) {
                    deferred.reject(response.data);
                    pendingRequestFactory.complete(request);
                });

            return deferred.promise;
        }
    }
})();
