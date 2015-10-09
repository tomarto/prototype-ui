/**
 * @ngdoc function
 * @name myApp.factory:actionFactory
 * @description
 * # actionFactory
 * Factory of the myApp
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('actionFactory', actionFactory);

    /* @ngInject */
    function actionFactory($http, $q, $cacheFactory, config) {
        var actionsCache = $cacheFactory('actions');

        return {
            getActions: function() {
                var deferred = $q.defer(),
                    cachedActions = actionsCache.get('cachedActions');

                if (cachedActions) {
                    deferred.resolve(cachedActions);
                } else {
                    $http.get(config.api.actions)
                        .then(function(response) {
                            actionsCache.put('cachedActions', response.data.result);
                            deferred.resolve(response.data.result);
                        }, function(response) {
                            deferred.reject(response.data);
                        });
                }

                return deferred.promise;
            }
        };
    }
})();
