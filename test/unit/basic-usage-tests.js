var helper = require('./helpers.js');
var assert = require('assert');
var MockBucket = require('./mock-bucket.js');

describe('basic usage', function() {
    var chesterfield;
    var couchbaseMocks;

    before(function() {
        couchbaseMocks = helper.mockCouchbase();
        chesterfield = helper.getLib();
    });
    
    after(function() {
       helper.disable();
    });

    describe('connection tests', function() {
        var cluster;
        var bucketAgent;

        describe('cluster', function () {
            it('should connect to cluster', function () {
                cluster = chesterfield.cluster('couchbase://localhost');
                assert.equal(couchbaseMocks.Cluster.calledOnce, true);
            });
        });

        describe('openBucket', function () {
            it('should give bucket agent function ', function () {
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

                    couchbaseMocks.bucketMock.emit('connect', couchbaseMocks.bucketMock);
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

                    couchbaseMocks.bucketMock.emit('error', {code: 666});
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

    describe('bucket operations', function() {
        var bucketAgent;
        before(function() {
            bucketAgent = function(callback) {
                callback(null, new MockBucket());
            };
        });

        describe('append', function () {
            it('should call append on bucket', function() {
                chesterfield.append(bucketAgent, 'someKey', {}, function () {});
                assert.equal(couchbaseMocks.bucketMock.append.calledOnce, true);
            });
        });

        describe('counter', function () {
            it('should call counter on bucket', function() {
                chesterfield.counter(bucketAgent, 'someKey', {}, function () {});
                assert.equal(couchbaseMocks.bucketMock.counter.calledOnce, true);
            });
        });

        describe('get', function () {
            it('should call get on bucket', function() {
                chesterfield.get(bucketAgent, 'someKey', function () {});
                assert.equal(couchbaseMocks.bucketMock.get.calledOnce, true);
            });
        });

        describe('getReplica', function () {
            it('should call getReplica on bucket', function() {
                chesterfield.getReplica(bucketAgent, 'someKey', function () {});
                assert.equal(couchbaseMocks.bucketMock.getReplica.calledOnce, true);
            });
        });

        describe('getMulti', function () {
            it('should call getMulti on bucket', function() {
                chesterfield.getMulti(bucketAgent, ['someKey1', 'someKey2'], function () {});
                assert.equal(couchbaseMocks.bucketMock.getMulti.calledOnce, true);
            });
        });
        describe('insert', function () {
            it('should call insert on bucket', function() {
                chesterfield.insert(bucketAgent, 'someKey', {}, function () {});
                assert.equal(couchbaseMocks.bucketMock.insert.calledOnce, true);
            });
        });
        describe('prepend', function () {
            it('should call prepend on bucket', function() {
                chesterfield.prepend(bucketAgent, 'someKey', 'something to prepend', function () {});
                assert.equal(couchbaseMocks.bucketMock.prepend.calledOnce, true);
            });
        });
        describe('query', function () {
            it('should call query on bucket', function() {
                chesterfield.query(bucketAgent, 'some query thing', function () {});
                assert.equal(couchbaseMocks.bucketMock.query.calledOnce, true);
            });
        });
        describe('remove', function () {
            it('should call remove on bucket', function() {
                chesterfield.remove(bucketAgent, 'someKey', function () {});
                assert.equal(couchbaseMocks.bucketMock.remove.calledOnce, true);
            });
        });
        describe('replace', function () {
            it('should call append on bucket', function() {
                chesterfield.replace(bucketAgent, 'someKey', {}, function () {});
                assert.equal(couchbaseMocks.bucketMock.replace.calledOnce, true);
            });
        });
        describe('upsert', function () {
            it('should call upsert on bucket', function() {
                chesterfield.upsert(bucketAgent, 'someKey', {}, function () {});
                assert.equal(couchbaseMocks.bucketMock.upsert.calledOnce, true);
            });
        });
    });
});
