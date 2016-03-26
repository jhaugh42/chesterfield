var helper = require('./helpers.js');
var assert = require('assert');
var MockBucket = require('./mock-bucket.js');

describe('basic usage', function() {
    var chesterfield;
    var couchbaseMocks;
    var cluster;
    var onBucketResult;
    var bucket;
    
    before(function() {
        couchbaseMocks = helper.mockCouchbase();
        chesterfield = helper.getLib();
    });
    
    after(function() {
       helper.disable();
    });

    describe('cluster', function() {
        it('should connect to cluster', function () {
            cluster = chesterfield.cluster('couchbase://localhost');
            assert.equal(couchbaseMocks.Cluster.calledOnce, true);
        });
    });

    describe('openBucket', function() {
        it('should give bucket agent function ', function() {
            onBucketResult = chesterfield.openBucket(cluster, 'beer', 'guest');
            assert.equal(typeof onBucketResult, 'function');
        });
    });

    describe('onBucketResult', function() {
        describe('on connect', function() {
            var error;

            before(function () {
                onBucketResult(function (bucketError, resultingBucket) {
                    error = bucketError;
                    bucket = resultingBucket;
                });

                couchbaseMocks.bucketMock.emit('connect', couchbaseMocks.bucketMock);
            });

            it('should not return error', function() {
                assert.equal(!error, true);
            });

            it('should return bucket object', function () {
                assert.equal(bucket instanceof MockBucket, true);
            });
        });

        describe('on error', function() {
            var error;
            var badBucket;

            before(function () {
                onBucketResult(function (bucketError, resultingBucket) {
                    error = bucketError;
                    badBucket = resultingBucket;
                });
                
                couchbaseMocks.bucketMock.emit('error', { code: 666 });
            });

            it('should return error', function() {
                assert.equal(error.code, 666);
            });

            it('should not return bucket object', function () {
                assert.equal(!badBucket, true);
            });
        });
    });

    describe('bucket operations', function() {
        //TODO: add more test
    });
});
