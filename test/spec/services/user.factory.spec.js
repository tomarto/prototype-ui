'use strict';

describe('Factory: userFactory', function () {

    var userFactory,
        http,
        mockedUser = {
            result: {
                username: 'test',
                firstName: 'testFirst',
                lastName: 'testLast'
            }
        };

    // load the controller's module
    beforeEach(module('myApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _userFactory_) {
        http = _$httpBackend_;
        userFactory = _userFactory_;
    }));

    it('should perform a POST request for login', function (done) {
        var resolve = function(response) {
            expect(response).toBe('Success');
        };

        var reject = function() {};

        http.expectPOST('prototype/login').respond(200, 'Success');

        userFactory.login()
            .then(resolve)
            .catch(reject)
            .finally(done);

        http.flush();
    });

    it('should perform a POST request for logout', function (done) {
        var resolve = function(response) {
            expect(response).toBe('Success');
        };

        var reject = function() {};

        http.expectPOST('prototype/logout').respond(200, 'Success');

        userFactory.logout()
            .then(resolve)
            .catch(reject)
            .finally(done);

        http.flush();
    });

    it('should perform a POST request for getUser', function (done) {
        var resolve = function(response) {
            expect(response.username).toBe(mockedUser.result.username);
            expect(response.firstName).toBe(mockedUser.result.firstName);
            expect(response.lastName).toBe(mockedUser.result.lastName);
        };

        var reject = function() {};

        http.expectPOST('prototype/user').respond(200, mockedUser);

        userFactory.getUser()
            .then(resolve)
            .catch(reject)
            .finally(done);

        http.flush();
    });

    it('should perform a POST request for register', function (done) {
        var resolve = function(response) {
            expect(response.username).toBe(mockedUser.result.username);
            expect(response.firstName).toBe(mockedUser.result.firstName);
            expect(response.lastName).toBe(mockedUser.result.lastName);
        };

        var reject = function() {};

        http.expectPOST('prototype/user/register').respond(200, mockedUser);

        userFactory.register()
            .then(resolve)
            .catch(reject)
            .finally(done);

        http.flush();
    });
});
