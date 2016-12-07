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

        it('should return the result of chesterfieldBucket.bind', function() {
            chesterfieldBucket.bind.returns('result of _bucket.bind');
            cluster.openBucket.returns({a: 'bucket'});

            var result = chesterfield.open(cluster, 'bucketName', 'password');

            expect(result).to.equal('result of _bucket.bind');
        });

        describe('when options are not specified', function () {
            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket and an empty array', function () {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password');

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket'}, []]
                ]);
            });
        });

        describe('when known options are specified', function() {
            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and an operationTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { operationTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', operationTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a viewTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { viewTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', viewTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a n1qlTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { n1qlTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', n1qlTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a durabilityTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { durabilityTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', durabilityTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a durabilityInterval specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { durabilityInterval: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', durabilityInterval: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a managementTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { managementTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', managementTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a configThrottle specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { configThrottle: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', configThrottle: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a connectionTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { connectionTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', connectionTimeout: 'abcd'}, []]
                ]);
            });

            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket, ' +
                'with an  and a nodeConnectionTimeout specified ' +
                'empty array', function() {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', { nodeConnectionTimeout: 'abcd'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket', nodeConnectionTimeout: 'abcd'}, []]
                ]);
            });
        });

        describe('when unknown options are specified', function() {
            it('should call chesterfieldBucket.bind with null context, ' +
                'the bucket returned from cluster.openBucket and an empty array', function () {
                cluster.openBucket.returns({a: 'bucket'});

                chesterfield.open(cluster, 'bucketName', 'password', {some: 'option', shouldnt: 'be added to bucket'});

                expect(chesterfieldBucket.bind.args).to.eql([
                    [null, {a: 'bucket'}, []]
                ]);
            });
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

