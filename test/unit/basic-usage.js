var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('basic usage', function() {
    var chesterfield;
    var couchbaseMock;
    var bucketMock;
    var invokeSpy;

    function NotChesterfieldViewQuery() {
    }

    function ViewQuery() {
    }

    function N1qlQuery() {
    }

    function SpatialQuery() {
    }

    function SearchQuery() {
    }

    before(function () {
        bucketMock = {};

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

        operations.forEach(function (operationName) {
            bucketMock[operationName] = sinon.stub();
        });

        couchbaseMock = {
            Cluster: sinon.stub().returns({
                openBucket: sinon.stub().returns(bucketMock)
            }),
            ViewQuery: ViewQuery,
            N1qlQuery: N1qlQuery,
            SpatialQuery: SpatialQuery,
            SearchQuery: SearchQuery
        };

        invokeSpy = sinon.spy(function (s, f, a) {
            var callback = a[a.length - 1];
            callback();
        });

        mockery.enable({
            useCleanCache: true
        });

        mockery.registerMock('./chesterfield-bucket.js', sinon.stub());
        mockery.registerMock('couchbase', couchbaseMock);
        mockery.registerMock('./invoke.js', invokeSpy);
        mockery.registerAllowable('../../lib/chesterfield');
        chesterfield = require('../../lib/chesterfield');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('bucket operations', function () {
        var bucket;

        before(function () {
            bucket = sinon.stub();
            bucket.callsArgWith(0, null, bucketMock);
        });

        beforeEach(function () {
            bucket.reset();
            invokeSpy.reset();
        });

        describe('positive tests', function () {
            it('should call append on bucket', function (done) {
                chesterfield.append(bucket, 'someKey', {}, function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.append), true);
                    done();
                });
            });

            it('should call counter on bucket', function (done) {
                chesterfield.counter(bucket, 'someKey', {}, function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.counter), true);
                    done();
                });
            });

            it('should call get on bucket', function (done) {
                chesterfield.get(bucket, 'someKey', function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.get), true);
                    done();
                });
            });

            it('should call getReplica on bucket', function (done) {
                chesterfield.getReplica(bucket, 'someKey', function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.getReplica), true);
                    done();
                });
            });

            it('should call getMulti on bucket', function (done) {
                chesterfield.getMulti(bucket, ['someKey1', 'someKey2'], function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.getMulti), true);
                    done();
                });
            });

            it('should call insert on bucket', function (done) {
                chesterfield.insert(bucket, 'someKey', {}, function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.insert), true);
                    done();
                });
            });

            it('should call prepend on bucket', function (done) {
                chesterfield.prepend(bucket, 'someKey', 'something to prepend', function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.prepend), true);
                    done();
                });
            });

            it('should call query on bucket when called with a ViewQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.ViewQuery(), function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.query), true);
                    done();
                });
            });

            it('should call query on bucket when called with a SpatialQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.SpatialQuery(), function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.query), true);
                    done();
                });
            });

            it('should call query on bucket when called with a N1qlQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.N1qlQuery(), function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.query), true);
                    done();
                });
            });

            it('should call query on bucket when called with a SearchQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.SearchQuery(), function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.query), true);
                    done();
                });
            });

            it('should call back with a TypeError error when the type of query specified is not an instance of a query object exposed by chesterfield', function (done) {
                chesterfield.query(bucket, new NotChesterfieldViewQuery(), function (error) {
                    assert.equal(error instanceof TypeError, true);
                    done();
                });
            });

            it('should call back with a TypeError error when the specified query is not an object', function (done) {
                chesterfield.query(bucket, 'i am not an object', function (error) {
                    assert.equal(error instanceof TypeError, true);
                    done();
                });
            });

            it('should call remove on bucket', function (done) {
                chesterfield.remove(bucket, 'someKey', function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.remove), true);
                    done();
                });
            });

            it('should call replace on bucket', function (done) {
                chesterfield.replace(bucket, 'someKey', {}, function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.replace), true);
                    done();
                });
            });

            it('should call upsert on bucket', function (done) {
                chesterfield.upsert(bucket, 'someKey', {}, function () {
                    assert.equal(invokeSpy.calledWith(bucketMock, bucketMock.upsert), true);
                    done();
                });
            });
        });

        describe('bucket calls back with error', function () {
            var expectedError;

            before(function () {
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

            it('should callback with the error from the bucket when query is invoked with a ViewQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.ViewQuery(), function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should callback with the error from the bucket when query is invoked with a SpatialQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.SpatialQuery(), function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should callback with the error from the bucket when query is invoked with a N1qlQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.N1qlQuery(), function (error) {
                    assert.deepEqual(error, expectedError);
                    done();
                });
            });

            it('should callback with the error from the bucket when query is invoked with a SearchQuery', function (done) {
                chesterfield.query(bucket, new chesterfield.SearchQuery(), function (error) {
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
