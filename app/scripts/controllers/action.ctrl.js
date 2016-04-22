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
    function ActionCtrl($state, $sessionStorage, $stateParams, eventFactory, result) {
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
        vm.rows = [10, 25, 50, 100];
        vm.data.rows = vm.rows[1];
        vm.data.offset = 0;

        vm.openDatepicker = openDatepicker;
        vm.search = search;
        vm.changeOffset = changeOffset;
        vm.getNumber = getNumber;

        activate();

        function activate() {
            if ($sessionStorage.loggedUser) {
                if (result.errorMessage) {
                    eventFactory.broadcastError(result.errorMessage);
                    return;
                }
                if ($sessionStorage[$stateParams.searchId]) {
                    vm.data = retrieveData();
                }
                vm.actions = result.actions;
                vm.totalResults = result.total;
                vm.totalPages = Math.ceil(result.total / vm.data.rows);
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
                vm.data.rows = vm.data.rows ? vm.data.rows : null;
                vm.data.offset = 0;
                var newSearchId = Date.now().toString();
                $sessionStorage[newSearchId] = vm.data;
                $state.go('actions', {searchId: newSearchId});
            }
        }

        function retrieveData() {
            var data = angular.copy($sessionStorage[$stateParams.searchId]);
            data.createdDate = vm.data.createdDate ? new Date(vm.data.createdDate) : null;
            data.dueDate = vm.data.dueDate ? new Date(vm.data.dueDate) : null;
            return data;
        }

        function getFormattedDate(date) {
            return date ? (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() : null;
        }

        function changeOffset(offset) {
            vm.data = retrieveData();
            vm.data.offset = offset * vm.data.rows;
            var newSearchId = Date.now().toString();
            $sessionStorage[newSearchId] = vm.data;
            $state.go('actions', {searchId: newSearchId});
        }

        function getNumber(num) {
            return new Array(num);
        }
    }
})();
