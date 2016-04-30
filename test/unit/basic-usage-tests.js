var assert = require('assert');
var MockBucket = require('./mock-bucket.js');
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
        var bucketAgent;

        describe('cluster', function () {
            it('should connect to cluster', function () {
                cluster = chesterfield.cluster('couchbase://localhost');
                assert.equal(couchbaseMock.Cluster.calledOnce, true);
            });
        });

        describe('openBucket', function () {
            it('should return bucket agent function ', function () {
                bucketAgent = chesterfield.openBucket(cluster, 'beer', 'guest');
                assert.equal(typeof bucketAgent, 'function');
            });
        });

        describe('bucketAgent', function () {
            describe('on connect', function () {
                var error;
                var bucket;

                before(function (done) {
                    bucketAgent(function (bucketError, resultingBucket) {
                        error = bucketError;
                        bucket = resultingBucket;
                        done();
                    });

                    couchbaseMock.bucketMock.emit('connect', couchbaseMock.bucketMock);
                });

                it('should not return error', function () {
                    assert.equal(!error, true);
                });

                it('should return bucket object', function () {
                    assert.equal(bucket instanceof MockBucket, true);
                });
            });

            describe('on error', function () {
                var error;
                var badBucket;

                before(function (done) {
                    bucketAgent(function (bucketError, resultingBucket) {
                        error = bucketError;
                        badBucket = resultingBucket;
                        done();
                    });

                    couchbaseMock.bucketMock.emit('error', {code: 666});
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
        var bucketAgent;
        var bucketMock;

        before(function() {
            bucketAgent = sinon.stub();
            bucketMock = new MockBucket();
        });

        beforeEach(function() {
            bucketAgent.reset();
        });

        describe('append', function () {
            it('should call append on bucket', function (done) {
                chesterfield.append(bucketAgent, 'someKey', {}, function () {
                    assert.equal(bucketMock.append.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.append.callArg(2);
            });
        });

        describe('counter', function () {
            it('should call counter on bucket', function (done) {
                chesterfield.counter(bucketAgent, 'someKey', {}, function () {
                    assert.equal(bucketMock.counter.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.counter.callArg(2);
            });
        });

        describe('get', function () {
            it('should call get on bucket', function (done) {
                chesterfield.get(bucketAgent, 'someKey', function () {
                    assert.equal(bucketMock.get.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.get.callArg(1);
            });
        });

        describe('getReplica', function () {
            it('should call getReplica on bucket', function (done) {
                chesterfield.getReplica(bucketAgent, 'someKey', function () {
                    assert.equal(bucketMock.getReplica.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.getReplica.callArg(1);
            });
        });

        describe('getMulti', function () {
            it('should call getMulti on bucket', function (done) {
                chesterfield.getMulti(bucketAgent, ['someKey1', 'someKey2'], function () {
                    assert.equal(bucketMock.getMulti.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.getMulti.callArg(1);
            });
        });
        describe('insert', function () {
            it('should call insert on bucket', function (done) {
                chesterfield.insert(bucketAgent, 'someKey', {}, function () {
                    assert.equal(bucketMock.insert.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.insert.callArg(2);
            });
        });
        describe('prepend', function () {
            it('should call prepend on bucket', function (done) {
                chesterfield.prepend(bucketAgent, 'someKey', 'something to prepend', function () {
                    assert.equal(bucketMock.prepend.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.prepend.callArg(2);
            });
        });
        describe('query', function () {
            it('should call query on bucket', function (done) {
                chesterfield.query(bucketAgent, 'some query thing', function () {
                    assert.equal(bucketMock.query.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.query.callArg(1);
            });
        });
        describe('remove', function () {
            it('should call remove on bucket', function (done) {
                chesterfield.remove(bucketAgent, 'someKey', function () {
                    assert.equal(bucketMock.remove.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.remove.callArg(1);
            });
        });
        describe('replace', function () {
            it('should call replace on bucket', function (done) {
                chesterfield.replace(bucketAgent, 'someKey', {}, function () {
                    assert.equal(bucketMock.replace.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.replace.callArg(2);
            });
        });
        describe('upsert', function () {
            it('should call upsert on bucket', function (done) {
                chesterfield.upsert(bucketAgent, 'someKey', {}, function () {
                    assert.equal(bucketMock.upsert.calledOnce, true);
                    done();
                });

                bucketAgent.callArgWith(0, null, bucketMock);
                bucketMock.upsert.callArg(2);
            });
        });
    });
});
