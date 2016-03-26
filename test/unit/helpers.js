var mockery = require('mockery');

module.exports = {
    mockCouchbase: function() {
        var couchbaseMock = require('./mock-couchbase.js');
        mockery.enable({
            useCleanCache: true
        });
        mockery.registerMock('couchbase', couchbaseMock);
        return couchbaseMock;
    },
    getLib: function() {
        return require('../../lib/chesterfield');
    },
    disable: function() {
        mockery.disable();
    }
};
