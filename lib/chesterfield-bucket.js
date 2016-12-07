'use strict';

module.exports = function (couchbaseBucket, deferredCallbacks, callback) {
    if (couchbaseBucket.connected) {
        callback(null, couchbaseBucket);
        return;
    }

    deferredCallbacks.push(callback);

    if(couchbaseBucket.listeners('connect').length === 0) {
        couchbaseBucket.once('connect', function () {
            var queuedCallback;
            while(queuedCallback = deferredCallbacks.shift()) {
                queuedCallback(null, couchbaseBucket);
            }
        });
    }

    if(couchbaseBucket.listeners('error').length === 0) {
        couchbaseBucket.once('error', function (err) {
            var queuedCallback;
            while (queuedCallback = deferredCallbacks.shift()) {
                queuedCallback(err);
            }
        });
    }
};