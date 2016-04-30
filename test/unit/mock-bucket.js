var EventEmitter = require('events').EventEmitter;
var util = require('util');
var sinon = require('sinon');

module.exports = MockBucket;

util.inherits(MockBucket, EventEmitter);

function MockBucket() {
    var self = this;
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
        self[operationName] = sinon.stub();
    });
}
