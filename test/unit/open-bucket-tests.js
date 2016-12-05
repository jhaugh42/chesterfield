'use strict';
var mockery = require('mockery');
var sinon = require('sinon');
var assert = require('assert');

describe('open', function() {

    before(function(){
        mockery.enable({
            useCleanCache: true
        });
        mockery.registerMock('couchbase', {});
        mockery.registerMock('./invoke.js', {});
        mockery.registerAllowable('../../lib/chesterfield.js');
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    var bucket;
    var cluster;

    beforeEach(function() {
        bucket = {
            listeners: sinon.stub(),
            once: sinon.stub()
        };
        cluster = {
            openBucket: sinon.stub().returns(bucket)
        }
    });



});