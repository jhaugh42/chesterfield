var assert = require('assert');
var sinon = require('sinon');

describe('invoke.js', function() {
    var funcMock;
    var args;

    before(function() {
        funcMock = { apply: sinon.stub() };
        args = [{bucket: true}, 'key', {value:{}}];
        var invoke = require('../../lib/invoke.js');
        invoke(funcMock, args);
    });

    it('should call apply function on all args except the first one', function() {
        var expectedArgs = ['key', {value:{}}];
        assert.equal(funcMock.apply.calledWith(null, expectedArgs), true);
    });
});
