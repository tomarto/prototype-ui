'use strict';

describe('Controller: LoginCtrl', function () {

    var LoginCtrl,
        scope,
        mockUserFactory;

    // load the controller's module
    beforeEach(module('myApp'));

    beforeEach(
        module(function($provide) {
            $provide.value('userFactory', {
                login: function(credencials) {
                    return {
                        then: function(resolve, reject) {
                            return resolve('resolved');
                        }
                    };
                },
                getUser: function() {
                    return {
                        then: function(resolve, reject) {
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
        spyOn(mockUserFactory, 'login').and.callThrough();
        spyOn(mockUserFactory, 'getUser').and.callThrough();
        LoginCtrl = _$controller_('LoginCtrl', {
            $scope: scope,
            $state: _$state_,
            userFactory: mockUserFactory
            // place here mocked dependencies
        });
    }));

    it('should check for the controller to be defined and for a successfully login method call', function () {
        expect(LoginCtrl).toBeDefined();
        LoginCtrl.login();
        expect(mockUserFactory.login).toHaveBeenCalled();
        expect(mockUserFactory.getUser).toHaveBeenCalled();
    });
});
