'use strict';
var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('chesterfield-bucket', function() {

    before(function () {
        mockery.enable({
            useCleanCache: true
        });
        mockery.registerAllowable('../../lib/chesterfield-bucket.js');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    var couchbaseBucket;
    var chesterfieldBucket;
    var callbackSpy;

    beforeEach(function () {
        mockery.resetCache();

        couchbaseBucket = {
            listeners: sinon.stub(),
            once: sinon.stub()
        };
        callbackSpy = sinon.spy();

        chesterfieldBucket = require('../../lib/chesterfield-bucket.js');
    });

    describe('when the bucket is connected', function() {
        it('should call the callback if the bucket is connected', function() {
            couchbaseBucket.connected = true;

            chesterfieldBucket(couchbaseBucket, [], callbackSpy);

            expect(callbackSpy.args).to.eql([
                [null, couchbaseBucket]
            ]);
        });

        it('should not check for listeners on the bucket when the bucket is connected', function() {
            couchbaseBucket.connected = true;

            chesterfieldBucket(couchbaseBucket, [], callbackSpy);

            expect(couchbaseBucket.listeners.notCalled).to.equal(true);
        });


        it('should not register once listeners on the bucket when the bucket is connected', function() {
            couchbaseBucket.connected = true;

            chesterfieldBucket(couchbaseBucket, [], callbackSpy);

            expect(couchbaseBucket.once.notCalled).to.equal(true);
        });
    });

    describe('when the bucket is not connected', function() {

        describe('when both "connect" and "error" listeners are registered', function() {
            it('should call bucket.listeners twice, first with "connect", then with "error"', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.listeners.args).to.eql([
                    ['connect'],
                    ['error']
                ]);
            });

            it('should not call bucket.once to register additional listeners', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.notCalled).to.equal(true);
            });
        });

        describe('when both "connect" and "error" listeners are not registered', function() {
            it('should call bucket.listeners twice, first with "connect", then with "error"', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.listeners.args).to.eql([
                    ['connect'],
                    ['error']
                ]);
            });

            it('should call bucket.once with "connect" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('connect', sinon.match.func)).to.equal(true);
            });

            it('should call bucket.once with "error" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('error', sinon.match.func)).to.equal(true);
            });

            it('should call bucket.once exactly twice', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledTwice).to.equal(true);
            });
        });

        describe('when a "connect" listener is registered and an "error" listener is not', function() {
            it('should call bucket.listeners twice, first with "connect", then with "error"', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
                couchbaseBucket.listeners.withArgs('error').returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.listeners.args).to.eql([
                    ['connect'],
                    ['error']
                ]);
            });

            it('should not call bucket.once with "connect" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
                couchbaseBucket.listeners.withArgs('error').returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('connect', sinon.match.func)).to.equal(false);
            });

            it('should call bucket.once with "error" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
                couchbaseBucket.listeners.withArgs('error').returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('error', sinon.match.func)).to.equal(true);
            });

            it('should call bucket.once exactly once', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
                couchbaseBucket.listeners.withArgs('error').returns({length: 0});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledOnce).to.equal(true);
            });
        });

        describe('when a "connect" listener is not registered and an "error" listener is registered', function() {
            it('should call bucket.listeners twice, first with "connect", then with "error"', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 0});
                couchbaseBucket.listeners.withArgs('error').returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.listeners.args).to.eql([
                    ['connect'],
                    ['error']
                ]);
            });

            it('should call bucket.once with "connect" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 0});
                couchbaseBucket.listeners.withArgs('error').returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('connect', sinon.match.func)).to.equal(true);
            });

            it('should not call bucket.once with "error" and a callback', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 0});
                couchbaseBucket.listeners.withArgs('error').returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledWith('error', sinon.match.func)).to.equal(false);
            });

            it('should call bucket.once exactly once', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 0});
                couchbaseBucket.listeners.withArgs('error').returns({length: 1});

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(couchbaseBucket.once.calledOnce).to.equal(true);
            });
        });

        describe('invoking the callback when bucket.once("connect") is handled', function() {
            it('should call the callback once, with null and the bucket', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 0});
                couchbaseBucket.listeners.withArgs('error').returns({length: 1});
                couchbaseBucket.once.onCall(0).callsArg(1);

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(callbackSpy.args).to.eql([
                    [null, couchbaseBucket]
                ]);
            });
        });

        describe('invoking the callback when bucket.once("error") is handled', function() {
            it('should call the callback once, with the error provided by the handler', function() {
                couchbaseBucket.connected = false;
                couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
                couchbaseBucket.listeners.withArgs('error').returns({length: 0});
                couchbaseBucket.once.onCall(0).callsArgWith(1, 'this is an error');

                chesterfieldBucket(couchbaseBucket, [], callbackSpy);

                expect(callbackSpy.args).to.eql([
                    ['this is an error']
                ]);
            });
        });
    });

    describe('invoking deferred callbacks on connect', function() {

        it('should invoke the callback three times when the couchbase bucket handles a connect event ' +
            'after having been disconnected for three invocations', function() {
            couchbaseBucket.connected = false;
            couchbaseBucket.listeners.withArgs('error').returns({length: 1});
            couchbaseBucket.listeners.withArgs('connect')
                .onFirstCall().returns({length: 0})
                .onSecondCall().returns({length: 1})
                .onThirdCall().returns({length: 1});

            var boundChesterfieldBucket = chesterfieldBucket.bind(null, couchbaseBucket, []);
            boundChesterfieldBucket(callbackSpy);
            boundChesterfieldBucket(callbackSpy);
            boundChesterfieldBucket(callbackSpy);

            var connectCallback = couchbaseBucket.once.args[0][1];
            connectCallback();

            expect(callbackSpy.args).to.eql([
                [null, couchbaseBucket],
                [null, couchbaseBucket],
                [null, couchbaseBucket]
            ]);
        });

        it('should invoke the callback three times when the couchbase bucket handles an error event ' +
            'after having been disconnected for three invocations', function() {
            couchbaseBucket.connected = false;
            couchbaseBucket.listeners.withArgs('connect').returns({length: 1});
            couchbaseBucket.listeners.withArgs('error')
                .onFirstCall().returns({length: 0})
                .onSecondCall().returns({length: 1})
                .onThirdCall().returns({length: 1});

            var boundChesterfieldBucket = chesterfieldBucket.bind(null, couchbaseBucket, []);
            boundChesterfieldBucket(callbackSpy);
            boundChesterfieldBucket(callbackSpy);
            boundChesterfieldBucket(callbackSpy);

            var connectCallback = couchbaseBucket.once.args[0][1];
            connectCallback('some error');

            expect(callbackSpy.args).to.eql([
                ['some error'],
                ['some error'],
                ['some error']
            ]);
        });
    });
});