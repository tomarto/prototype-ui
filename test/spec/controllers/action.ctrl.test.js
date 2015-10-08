'use strict';

describe('Controller: ActionCtrl', function () {

    // load the controller's module
    beforeEach(module('myApp'));

    var ActionCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_) {
        scope = _$rootScope_.$new();
        ActionCtrl = _$controller_('ActionCtrl', {
            $scope: scope,
            $state: _$state_,
            $sessionStorage: {
                loggedUser: {username: 'test'}
            },
            actions: []
            // place here mocked dependencies
        });
    }));

    it('should check for the controller and actions dependencies to be defined', function () {
        expect(ActionCtrl).toBeDefined();
        expect(ActionCtrl.actions).toBeDefined();
    });
});
