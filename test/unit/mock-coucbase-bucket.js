var EventEmitter = require('events').EventEmitter;
var util = require('util');
var sinon = require('sinon');

module.exports = MockCouchbaseBucket;

util.inherits(MockCouchbaseBucket, EventEmitter);

function MockCouchbaseBucket() {
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
