'use strict';
var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('chesterfield functions', function() {
    describe('chesterfield.open', function() {

        before(function () {
            mockery.enable({
                useCleanCache: true
            });
            mockery.registerMock('couchbase', {});
            mockery.registerMock('./invoke.js', {});
            mockery.registerAllowable('../../lib/chesterfield.js');
        });

        after(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        var bucket;
        var cluster;
        var chesterfield;
        var chesterfieldBucket;

        beforeEach(function () {
            mockery.resetCache();
            chesterfieldBucket = {
                bind: sinon.stub()
            };
            mockery.registerMock('./chesterfield-bucket.js', chesterfieldBucket);

            cluster = {
                openBucket: sinon.stub().returns({})
            };

            chesterfield = require('../../lib/chesterfield.js');
            chesterfield.append = {};
            chesterfield.cluster = {};
            chesterfield.counter = {};
            chesterfield.get = {};
            chesterfield.getReplica = {};
            chesterfield.getMulti = {};
            chesterfield.insert = {};
            chesterfield.prepend = {};
            chesterfield.query = {};
            chesterfield.remove = {};
            chesterfield.upsert = {};
        });

        afterEach(function() {
            mockery.deregisterMock('./chesterfield-bucket.js');
        });

        it('should call couchbase.openBucket once, with the bucket name and password', function () {
            chesterfield.open(cluster, 'bucketName', 'password');

            expect(cluster.openBucket.args).to.eql([
                ['bucketName', 'password']
            ]);
        });
    });

    describe('chesterfield.cluster', function() {
        before(function () {
            mockery.enable({
                useCleanCache: true
            });

            mockery.registerMock('./invoke.js', {});
            mockery.registerMock('./chesterfield-bucket.js', {});
            mockery.registerAllowable('../../lib/chesterfield.js');
        });

        after(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        var chesterfield;
        var couchbase;

        beforeEach(function () {
            mockery.resetCache();

            mockery.registerMock('couchbase', couchbase = {
                Cluster: sinon.stub()
            });

            chesterfield = require('../../lib/chesterfield.js');
            chesterfield.append = {};
            chesterfield.open = {};
            chesterfield.counter = {};
            chesterfield.get = {};
            chesterfield.getReplica = {};
            chesterfield.getMulti = {};
            chesterfield.insert = {};
            chesterfield.prepend = {};
            chesterfield.query = {};
            chesterfield.remove = {};
            chesterfield.upsert = {};
        });

        afterEach(function() {
            mockery.deregisterMock('./chesterfield-bucket.js');
        });

        it('should invoke couchbase.Cluster once, with the specified clusterDsn and options', function() {
            chesterfield.cluster('couchbaseDsn', {options: 'yes is options'});

            expect(couchbase.Cluster.args).to.eql([
                ['couchbaseDsn', {options: 'yes is options'}]
            ]);
        });

        it('should invoke couchbase.Cluster with new', function() {
            chesterfield.cluster('couchbaseDsn', {options: 'yes is options'});

            expect(couchbase.Cluster.calledWithNew()).to.equal(true);
        });

        it('should return the result of couchbase.Cluster', function() {
            couchbase.Cluster = function () {
                this.something = 1234;
            };

            var result = chesterfield.cluster('dsn', {});

            expect(result).to.eql({something: 1234});
        });
    });
});

