var sinon = require('sinon');
var MockCouchbaseBucket = require('./mock-coucbase-bucket.js');
var mockCouchbaseBucket = new MockCouchbaseBucket();

module.exports = {
    Cluster: sinon.stub().returns({
        open: sinon.stub().returns(mockCouchbaseBucket)
    }),
    mockCouchbaseBucket: mockCouchbaseBucket
};
