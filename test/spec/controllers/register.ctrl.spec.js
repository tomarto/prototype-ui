'use strict';

describe('Controller: RegisterCtrl', function () {

    var RegisterCtrl,
        scope,
        mockUserFactory;

    // load the controller's module
    beforeEach(module('myApp'));

    beforeEach(
        module(function($provide) {
            $provide.value('userFactory', {
                register: function() {
                    return {
                        then: function(resolve) {
                            return resolve('resolved');
                        }
                    };
                }
            });

            return null;
        })
    );

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _userFactory_) {
        scope = _$rootScope_.$new();
        mockUserFactory = _userFactory_;
        spyOn(mockUserFactory, 'register').and.callThrough();
        RegisterCtrl = _$controller_('RegisterCtrl', {
            $scope: scope,
            $state: _$state_,
            userFactory: mockUserFactory
            // place here mocked dependencies
        });
    }));

    it('should check for the controller to be defined and for a successfully register method call', function () {
        expect(RegisterCtrl).toBeDefined();
        RegisterCtrl.register({$valid: true});
        expect(mockUserFactory.register).toHaveBeenCalled();
    });
});
