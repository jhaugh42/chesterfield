var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;


describe('basic usage', function() {
    var chesterfield;
    var couchbaseMock;
    var bucketMock;

    before(function () {
        bucketMock = new EventEmitter();
        var operations = [
            'append',
            'counter',
            'get',
            'getReplica',
            'getMulti',
            'insert',
            'prepend',
            'query',
            'remove',
            'replace',
            'upsert'
        ];

        operations.forEach(function(operationName) {
            bucketMock[operationName] = sinon.stub();
        });

        couchbaseMock = {
            Cluster: sinon.stub().returns({
                openBucket: sinon.stub().returns(bucketMock)
            })
        };

        mockery.enable({
            useCleanCache: true
        });
        mockery.registerMock('couchbase', couchbaseMock);
        mockery.registerAllowable('../../lib/chesterfield');
        chesterfield = require('../../lib/chesterfield');
    });

    after(function () {
        mockery.disable();
    });

    describe('connection tests', function () {
        var cluster;

        describe('cluster', function () {
            it('should connect to cluster', function () {
                cluster = chesterfield.cluster('couchbase://localhost');
                assert.equal(couchbaseMock.Cluster.calledOnce, true);
            });
        });

        describe('open', function () {
            it('should return bucket agent function ', function () {
                var bucket = chesterfield.open(cluster, 'beer', 'guest');
                assert.equal(typeof bucket, 'function');
            });
        });

        describe('bucket', function () {
            describe('is connected', function () {
                var error;
                var connectedBucket;
                var bucket;

                before(function() {
                    var cluster = chesterfield.cluster('couchbase://localhost');
                    bucket = chesterfield.open(cluster, 'beer', 'guest');
                    bucketMock.removeAllListeners();
                });

                before(function (done) {
                    bucketMock.isConnected = true;
                    bucket(function (bucketError, resultingBucket) {
                        error = bucketError;
                        connectedBucket = resultingBucket;
                        done();
                    });
                });

                after(function() {
                    bucketMock.isConnected = false;
                });

                it('should not return error', function () {
                    assert.equal(!error, true);
                });

                it('should return bucket object', function () {
                    assert.deepEqual(connectedBucket, bucketMock);
                });
            });

            describe('on connect', function () {
                var error;
                var connectedBucket;
                var bucket;

                before(function() {
                    var cluster = chesterfield.cluster('couchbase://localhost');
                    bucket = chesterfield.open(cluster, 'beer', 'guest');
                    bucketMock.removeAllListeners();
                });

                before(function (done) {
                    bucket(function (bucketError, resultingBucket) {
                        error = bucketError;
                        connectedBucket = resultingBucket;
                        done();
                    });

                    bucketMock.emit('connect', bucketMock);
                });

                it('should not return error', function () {
                    assert.equal(!error, true);
                });

                it('should return bucket object', function () {
                    assert.deepEqual(connectedBucket, bucketMock);
                });
            });

            describe('on error', function () {
                var error;
                var badBucket;
                var bucket;

                before(function() {
                    var cluster = chesterfield.cluster('couchbase://localhost');
                    bucket = chesterfield.open(cluster, 'beer', 'guest');
                    bucketMock.removeAllListeners();
                });

                before(function (done) {
                    bucket(function (bucketError, resultingBucket) {
                        error = bucketError;
                        badBucket = resultingBucket;
                        done();
                    });

                    bucketMock.emit('error', {code: 666});
                });

                it('should return error', function () {
                    assert.equal(error.code, 666);
                });

                it('should not return bucket object', function () {
                    assert.equal(!badBucket, true);
                });
            });
        });
    });

    describe('bucket operations', function () {
        var bucket;

        before(function() {
            bucket = sinon.stub();
        });

        beforeEach(function() {
            bucket.reset();
        });

        describe('positive tests', function () {
            it('should call append on bucket', function (done) {
                chesterfield.append(bucket, 'someKey', {}, function () {
                    assert.equal(bucketMock.append.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.append.callArg(2);
            });

            it('should call counter on bucket', function (done) {
                chesterfield.counter(bucket, 'someKey', {}, function () {
                    assert.equal(bucketMock.counter.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.counter.callArg(2);
            });

            it('should call get on bucket', function (done) {
                chesterfield.get(bucket, 'someKey', function () {
                    assert.equal(bucketMock.get.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.get.callArg(1);
            });

            it('should call getReplica on bucket', function (done) {
                chesterfield.getReplica(bucket, 'someKey', function () {
                    assert.equal(bucketMock.getReplica.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.getReplica.callArg(1);
            });

            it('should call getMulti on bucket', function (done) {
                chesterfield.getMulti(bucket, ['someKey1', 'someKey2'], function () {
                    assert.equal(bucketMock.getMulti.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.getMulti.callArg(1);
            });

            it('should call insert on bucket', function (done) {
                chesterfield.insert(bucket, 'someKey', {}, function () {
                    assert.equal(bucketMock.insert.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.insert.callArg(2);
            });

            it('should call prepend on bucket', function (done) {
                chesterfield.prepend(bucket, 'someKey', 'something to prepend', function () {
                    assert.equal(bucketMock.prepend.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.prepend.callArg(2);
            });

            it('should call query on bucket', function (done) {
                chesterfield.query(bucket, 'some query thing', function () {
                    assert.equal(bucketMock.query.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.query.callArg(1);
            });

            it('should call remove on bucket', function (done) {
                chesterfield.remove(bucket, 'someKey', function () {
                    assert.equal(bucketMock.remove.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.remove.callArg(1);
            });

            it('should call replace on bucket', function (done) {
                chesterfield.replace(bucket, 'someKey', {}, function () {
                    assert.equal(bucketMock.replace.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.replace.callArg(2);
            });

            it('should call upsert on bucket', function (done) {
                chesterfield.upsert(bucket, 'someKey', {}, function () {
                    assert.equal(bucketMock.upsert.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, bucketMock);
                bucketMock.upsert.callArg(2);
            });
        });

        describe('bucket calls back with error', function () {
            var expectedError;

            before(function(){
                expectedError = new Error('yip yip yip yip yip');
                bucket.callsArgWith(0, expectedError);
            });

            it('append should call back with error', function (done) {
                chesterfield.append(bucket, 'someKey', {}, function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('counter should call back with error', function (done) {
                chesterfield.counter(bucket, 'someKey', {}, function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('get should call back with error', function (done) {
                chesterfield.get(bucket, 'someKey', function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('getReplica should call back with error', function (done) {
                chesterfield.getReplica(bucket, 'someKey', function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('getMulti should call back with error', function (done) {
                chesterfield.getMulti(bucket, ['someKey1', 'someKey2'], function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('insert should call back with error', function (done) {
                chesterfield.insert(bucket, 'someKey', {}, function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('prepend should call back with error', function (done) {
                chesterfield.prepend(bucket, 'someKey', 'something to prepend', function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should call query on bucket', function (done) {
                chesterfield.query(bucket, 'some query thing', function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should call remove on bucket', function (done) {
                chesterfield.remove(bucket, 'someKey', function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should call replace on bucket', function (done) {
                chesterfield.replace(bucket, 'someKey', {}, function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should call upsert on bucket', function (done) {
                chesterfield.upsert(bucket, 'someKey', {}, function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });
        });
    });
});
