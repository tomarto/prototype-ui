/**
 * @ngdoc function
 * @name myApp.factory:actionFactory
 * @desc
 * # actionFactory
 * Factory for Actions
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('actionFactory', actionFactory);

    /* @ngInject */
    function actionFactory($http, $q, $cacheFactory, $sessionStorage, config, pendingRequestFactory) {
        var actionsCache = $cacheFactory('actions'),
            factory = {
                getActions: getActions
            };

        return factory;

        function getActions(searchId) {
            var deferred = $q.defer(),
                cachedActions = actionsCache.get(searchId),
                params = angular.copy($sessionStorage[searchId]),
                request,
                requestOptions;

            if (cachedActions) {
                deferred.resolve(cachedActions);
            } else {
                request = pendingRequestFactory.register();
                requestOptions = {
                    params: params,
                    timeout: request.timeoutPromise
                };

                $http.get(config.api.actions, requestOptions)
                    .then(function(response) {
                        actionsCache.put(searchId, response.data.result);
                        deferred.resolve(response.data.result);
                        pendingRequestFactory.complete(request);
                    }, function(response) {
                        deferred.reject(response.data);
                        pendingRequestFactory.complete(request);
                    });
            }

            return deferred.promise;
        }

        function getFormattedDate(date) {
            return date ? (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() : date;
        }
    }
})();
