var couchbase = require('couchbase');
var invoke = require('./invoke.js');

module.exports = {
    append: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.append, args);
        });
    },
    cluster: function (clusterDsn, options) {
        return new couchbase.Cluster(clusterDsn, options);
    },
    counter: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.counter, args);
        });
    },
    get: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.get, args);
        });
    },
    getReplica: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.getReplica, args);
        });
    },
    getMulti: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.getMulti, args);
        });
    },
    insert: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.insert, args);
        });
    },
    open: function (cluster, bucketName, password) {
        var _bucket = cluster.openBucket(bucketName, password);

        function bucket(bucket, callback) {
            if (bucket.isConnected) {
                callback(null, bucket);
                return;
            }

            bucket.once('connect', function () {
                callback(null, bucket);
            });

            bucket.once('error', function (err) {
                callback(err);
            });
        }

        return bucket.bind(null, _bucket);
    },
    prepend: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length -1];
                callback(error);
                return;
            }

            invoke(operations, operations.prepend, args);
        });
    },
    query: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.query, args);
        });
    },
    remove: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.remove, args);
        });
    },
    replace: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.replace, args);
        });
    },
    upsert: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.upsert, args);
        });
    }
};
