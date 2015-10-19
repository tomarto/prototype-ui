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
    function actionFactory($http, $q, $cacheFactory, config, pendingRequestFactory) {
        var actionsCache = $cacheFactory('actions'),
            factory = {
                getActions: getActions
            };

        return factory;

        function getActions() {
            var deferred = $q.defer(),
                cachedActions = actionsCache.get('cachedActions'),
                request,
                requestOptions;

            if (cachedActions) {
                deferred.resolve(cachedActions);
            } else {
                request = pendingRequestFactory.register();
                requestOptions = {
                    timeout: request.timeoutPromise
                };

                $http.get(config.api.actions, requestOptions)
                    .then(function(response) {
                        actionsCache.put('cachedActions', response.data.result);
                        deferred.resolve(response.data.result);
                        pendingRequestFactory.complete(request);
                    }, function(response) {
                        deferred.reject(response.data);
                        pendingRequestFactory.complete(request);
                    });
            }

            return deferred.promise;
        }
    }
})();
