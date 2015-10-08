/**
 * @ngdoc config
 * @name myApp.config
 * @description
 * # config
 * Config of the myApp
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .constant('config', {
            api: {
                user: {
                    login: 'prototype/login',
                    logout: 'prototype/logout',
                    get: 'prototype/user',
                    register: 'prototype/user/register'
                },
                actions: 'prototype/actions'
            }
        });
})();
