/**
 * @ngdoc function
 * @name myApp.controller:ActionCtrl
 * @desc
 * # ActionCtrl
 * Controller for Actions
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ActionCtrl', ActionCtrl);

    /* @ngInject */
    function ActionCtrl($state, $sessionStorage, $stateParams, actions, eventFactory) {
        var vm = this;

        vm.data = {};
        vm.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        vm.createdDate = {
            maxDate: new Date(),
            opened: false
        };
        vm.dueDate = {
            minDate: new Date(),
            opened: false
        };

        vm.openDatepicker = openDatepicker;
        vm.search = search;

        activate();

        function activate() {
            if ($sessionStorage.loggedUser) {
                if (actions.errorMessage) {
                    eventFactory.broadcastError(actions.errorMessage);
                    return;
                }
                if ($sessionStorage[$stateParams.searchId]) {
                    vm.data = angular.copy($sessionStorage[$stateParams.searchId]);
                    vm.data.createdDate = vm.data.createdDate ? new Date(vm.data.createdDate) : null;
                    vm.data.dueDate = vm.data.dueDate ? new Date(vm.data.dueDate) : null;
                }
                vm.actions = actions;
            } else {
                $state.go('home', {}, {location: 'replace'});
            }
        }

        function openDatepicker(datePicker) {
            vm[datePicker].opened = true;
        }

        function search(searchActionsForm) {
            if (searchActionsForm.$dirty && searchActionsForm.$valid) {
                vm.data.createdDate = getFormattedDate(vm.data.createdDate);
                vm.data.dueDate = getFormattedDate(vm.data.dueDate);
                var newSearchId = Date.now().toString();
                $sessionStorage[newSearchId] = vm.data;
                $state.go('actions', {searchId: newSearchId});
            }
        }

        function getFormattedDate(date) {
            return date ? (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() : null;
        }
    }
})();
