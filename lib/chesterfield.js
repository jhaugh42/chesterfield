var couchbase = require('couchbase');
var invoke = require('./invoke.js');

module.exports = {
    append: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.append, args);
        });
    },
    cluster: function (clusterDsn, options) {
        return new couchbase.Cluster(clusterDsn, options);
    },
    counter: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.counter, args);
        });
    },
    get: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.get, args);
        });
    },
    getReplica: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.getReplica, args);
        });
    },
    getMulti: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.getMulti, args);
        });
    },
    insert: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.insert, args);
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
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length -1];
                callback(error);
                return;
            }

            invoke(bucket.prepend, args);
        });
    },
    query: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.query, args);
        });
    },
    remove: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.remove, args);
        });
    },
    replace: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.replace, args);
        });
    },
    upsert: function (bucket) {
        var args = arguments;
        bucket(function (error, bucket) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(bucket.upsert, args);
        });
    }
};
