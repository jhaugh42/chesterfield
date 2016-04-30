var assert = require('assert');
var MockCouchbaseBucket = require('./mock-coucbase-bucket.js');
var mockery = require('mockery');
var sinon = require('sinon');

describe('basic usage', function() {
    var chesterfield;
    var couchbaseMock;

    before(function () {
        couchbaseMock = require('./mock-couchbase.js');
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
        var bucket;

        describe('cluster', function () {
            it('should connect to cluster', function () {
                cluster = chesterfield.cluster('couchbase://localhost');
                assert.equal(couchbaseMock.Cluster.calledOnce, true);
            });
        });

        describe('open', function () {
            it('should return bucket agent function ', function () {
                bucket = chesterfield.open(cluster, 'beer', 'guest');
                assert.equal(typeof bucket, 'function');
            });
        });

        describe('bucket', function () {
            describe('on connect', function () {
                var error;
                var bucket;

                before(function (done) {
                    bucket(function (bucketError, resultingBucket) {
                        error = bucketError;
                        bucket = resultingBucket;
                        done();
                    });

                    couchbaseMock.mockCouchbaseBucket.emit('connect', couchbaseMock.mockCouchbaseBucket);
                });

                it('should not return error', function () {
                    assert.equal(!error, true);
                });

                it('should return bucket object', function () {
                    assert.equal(bucket instanceof MockCouchbaseBucket, true);
                });
            });

            describe('on error', function () {
                var error;
                var badBucket;

                before(function (done) {
                    bucket(function (bucketError, resultingBucket) {
                        error = bucketError;
                        badBucket = resultingBucket;
                        done();
                    });

                    couchbaseMock.mockCouchbaseBucket.emit('error', {code: 666});
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
        var mockCouchbaseBucket;

        before(function() {
            bucket = sinon.stub();
            mockCouchbaseBucket = new MockCouchbaseBucket();
        });

        beforeEach(function() {
            bucket.reset();
        });

        describe('append', function () {
            it('should call append on bucket', function (done) {
                chesterfield.append(bucket, 'someKey', {}, function () {
                    assert.equal(mockCouchbaseBucket.append.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.append.callArg(2);
            });
        });

        describe('counter', function () {
            it('should call counter on bucket', function (done) {
                chesterfield.counter(bucket, 'someKey', {}, function () {
                    assert.equal(mockCouchbaseBucket.counter.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.counter.callArg(2);
            });
        });

        describe('get', function () {
            it('should call get on bucket', function (done) {
                chesterfield.get(bucket, 'someKey', function () {
                    assert.equal(mockCouchbaseBucket.get.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.get.callArg(1);
            });
        });

        describe('getReplica', function () {
            it('should call getReplica on bucket', function (done) {
                chesterfield.getReplica(bucket, 'someKey', function () {
                    assert.equal(mockCouchbaseBucket.getReplica.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.getReplica.callArg(1);
            });
        });

        describe('getMulti', function () {
            it('should call getMulti on bucket', function (done) {
                chesterfield.getMulti(bucket, ['someKey1', 'someKey2'], function () {
                    assert.equal(mockCouchbaseBucket.getMulti.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.getMulti.callArg(1);
            });
        });
        describe('insert', function () {
            it('should call insert on bucket', function (done) {
                chesterfield.insert(bucket, 'someKey', {}, function () {
                    assert.equal(mockCouchbaseBucket.insert.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.insert.callArg(2);
            });
        });
        describe('prepend', function () {
            it('should call prepend on bucket', function (done) {
                chesterfield.prepend(bucket, 'someKey', 'something to prepend', function () {
                    assert.equal(mockCouchbaseBucket.prepend.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.prepend.callArg(2);
            });
        });
        describe('query', function () {
            it('should call query on bucket', function (done) {
                chesterfield.query(bucket, 'some query thing', function () {
                    assert.equal(mockCouchbaseBucket.query.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.query.callArg(1);
            });
        });
        describe('remove', function () {
            it('should call remove on bucket', function (done) {
                chesterfield.remove(bucket, 'someKey', function () {
                    assert.equal(mockCouchbaseBucket.remove.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.remove.callArg(1);
            });
        });
        describe('replace', function () {
            it('should call replace on bucket', function (done) {
                chesterfield.replace(bucket, 'someKey', {}, function () {
                    assert.equal(mockCouchbaseBucket.replace.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.replace.callArg(2);
            });
        });
        describe('upsert', function () {
            it('should call upsert on bucket', function (done) {
                chesterfield.upsert(bucket, 'someKey', {}, function () {
                    assert.equal(mockCouchbaseBucket.upsert.calledOnce, true);
                    done();
                });

                bucket.callArgWith(0, null, mockCouchbaseBucket);
                mockCouchbaseBucket.upsert.callArg(2);
            });
        });
    });
});
