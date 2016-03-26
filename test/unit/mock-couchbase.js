var sinon = require('sinon');
var MockBucket = require('./mock-bucket.js');
var bucketMock = new MockBucket();

module.exports = {
    Cluster: sinon.spy(function () {
        return {
            openBucket: sinon.spy(function() {
                return bucketMock;
            })
        };
    }),
    bucketMock: bucketMock
};
