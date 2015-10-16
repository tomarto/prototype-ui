'use strict';

describe('Factory: actionFactory', function () {

    var actionFactory,
        http,
        mockedResult = {
            result: [
                {
                    id: 1
                }
            ]
        };

    // load the controller's module
    beforeEach(module('myApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _actionFactory_) {
        http = _$httpBackend_;
        actionFactory = _actionFactory_;
    }));

    it('should fetch for all actions', function (done) {
        var resolve = function(response) {
            expect(response[0].id).toBe(mockedResult.result[0].id);
        };

        var reject = function(response) {};

        http.expectGET('prototype/actions').respond(200, mockedResult);

        actionFactory.getActions()
            .then(resolve)
            .catch(reject)
            .finally(done);

        http.flush();
    });
});
