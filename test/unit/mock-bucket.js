var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = MockBucket;

util.inherits(MockBucket, EventEmitter);

function MockBucket() {
}
