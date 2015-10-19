/**
 * @ngdoc function
 * @name myApp.factory:pendingRequestFactory
 * @desc
 * # pendingRequestFactory
 * Factory used to handle pending requests
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('pendingRequestFactory', pendingRequestFactory);

    /* @ngInject */
    function pendingRequestFactory($rootScope, $q) {
        $rootScope.spinner = {active: false};

        var pendingRequests = {},
            routeChangeListener = null,
            factory = {
                cancelAll: cancelAll,
                complete: complete,
                handlePendingRequests: handlePendingRequests,
                register: register,
                requestsPending: requestsPending
            };

        // Cancel any pending xhr when the root scope shuts down
        $rootScope.$on('$destroy', function() {
            factory.cancelAll();
        });

        return factory;

        function cancelAll() {
            angular.forEach(pendingRequests, function(request) {
                // This cancels the Ajax request by calling xhr.abort() method in $httpBackend
                request.timeoutDeferred.resolve();
                delete pendingRequests[request.id];
            });
            handlePendingRequests();
        }

        function complete(pendingRequest) {
            delete pendingRequests[pendingRequest.id];
            handlePendingRequests();
        }

        function handlePendingRequests() {
            if (requestsPending()) {
                $rootScope.spinner.active = true;
                if (!routeChangeListener) {
                    routeChangeListener = $rootScope.$on('$routeChangeStart', function() {
                        $rootScope.spinner.active = false;
                        cancelAll();
                    });
                }
            } else {
                $rootScope.spinner.active = false;
                if (routeChangeListener) {
                    // deregister route change listener
                    routeChangeListener();
                    routeChangeListener = null;
                }
            }
        }

        function register(message) {
            var deferred = $q.defer(),
                pendingRequest = {
                    id: Math.random().toString(),
                    timeoutPromise: deferred.promise,
                    timeoutDeferred: deferred
                };
            pendingRequests[pendingRequest.id] = pendingRequest;
            handlePendingRequests();
            return pendingRequest;
        }

        function requestsPending(message) {
            return !angular.equals({}, pendingRequests);
        }
    }
})();
