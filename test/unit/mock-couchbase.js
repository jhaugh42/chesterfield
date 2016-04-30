var sinon = require('sinon');
var MockBucket = require('./mock-bucket.js');
var bucketMock = new MockBucket();

module.exports = {
    Cluster: sinon.stub().returns({
        openBucket: sinon.stub().returns(bucketMock)
    }),
    bucketMock: bucketMock
};
