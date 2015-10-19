/**
 * @ngdoc config
 * @name myApp.config
 * @desc
 * # config
 * Constant for myApp
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
            },
            login: {
                error: 'An error ocurred while logging in. Please try again later.'
            }
        });
})();
