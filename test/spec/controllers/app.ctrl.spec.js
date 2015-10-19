'use strict';

describe('Controller: AppCtrl', function () {

    var AppCtrl,
        scope,
        mockUserFactory,
        mockCacheFactory,
        status;

    // load the controller's module
    beforeEach(module('myApp'));

    beforeEach(
        module(function($provide) {
            $provide.value('userFactory', {
                logout: function() {
                    return {
                        then: function(resolve, reject) {
                            if (status) {
                                return resolve('resolved');
                            } else {
                                return reject('rejected');
                            }
                        }
                    };
                }
            });

            mockCacheFactory = {
                info: function() {}
            };

            return null;
        })
    );

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _userFactory_) {
        scope = _$rootScope_.$new();
        mockUserFactory = _userFactory_;
        spyOn(mockUserFactory, 'logout').and.callThrough();
        AppCtrl = _$controller_('AppCtrl', {
            $scope: scope,
            $state: _$state_,
            $cacheFactory: mockCacheFactory,
            $sessionStorage: {
                loggedUser: {username: 'test'}
            },
            userFactory: mockUserFactory
            // place here mocked dependencies
        });
    }));

    it('should check for the controller to be defined and for a successfully logout method call', function () {
        status = true;
        expect(AppCtrl).toBeDefined();
        spyOn(mockCacheFactory, 'info').and.returnValue({templates: {id: 'templates', size: 0}});
        expect(AppCtrl.user.username).toBe('test');
        AppCtrl.logout();
        expect(mockUserFactory.logout).toHaveBeenCalled();
        expect(mockCacheFactory.info).toHaveBeenCalled();
        expect(AppCtrl.user).not.toBeDefined();
    });

    it('should check for a failed logout method call', function () {
        status = false;
        expect(AppCtrl).toBeDefined();
        expect(AppCtrl.user.username).toBe('test');
        expect(AppCtrl.errorMsg).not.toBeDefined();
        AppCtrl.logout();
        expect(mockUserFactory.logout).toHaveBeenCalled();
        expect(AppCtrl.user.username).toBe('test');
        expect(AppCtrl.errorMsg).toBeDefined();
    });
});
