/**
 * @ngdoc function
 * @name myApp.factory:userFactory
 * @description
 * # userFactory
 * Factory of the myApp
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('userFactory', userFactory);

    /* @ngInject */
    function userFactory($rootScope, $http, $q, $httpParamSerializerJQLike,
                $sessionStorage, config) {
        return {
            login: function(credentials) {
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
            },
            logout: function() {
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
            },
            getUser: function() {
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
                            $rootScope.$broadcast('login', response.data.result);
                            deferred.resolve(response.data.result);
                        }, function(response) {
                            deferred.reject(response);
                        });
                }

                return deferred.promise;
            },
            register: function(registerData) {
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
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
        };
    }
})();
