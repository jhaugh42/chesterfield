var couchbase = require('couchbase');
var invoke = require('./invoke.js');

module.exports = {
    ViewQuery: couchbase.ViewQuery,
    SpatialQuery: couchbase.SpatialQuery,
    N1qlQuery: couchbase.N1qlQuery,
    SearchQuery: couchbase.SearchQuery,
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
        var couchbaseBucket = cluster.openBucket(bucketName, password);

        //this as needed for backwards compatibility
        function bucket(callback) {
            callback(null, this.bucket);
        }

        return bucket.bind({bucket: couchbaseBucket});
    },
    prepend: function (bucket) {
        var args = arguments;
        bucket(function (error, operations) {
            if (error) {
                var callback = args[args.length - 1];
                callback(error);
                return;
            }

            invoke(operations, operations.prepend, args);
        });
    },
    query: function (bucket) {
        var args = arguments;
        var queryObject = args[1];
        var callback = args[args.length - 1];

        if (typeof queryObject === 'object' && (
            queryObject instanceof couchbase.ViewQuery ||
            queryObject instanceof couchbase.SpatialQuery ||
            queryObject instanceof couchbase.N1qlQuery ||
            queryObject instanceof couchbase.SearchQuery)) {

            bucket(function (error, operations) {
                if (error) return callback(error);
                invoke(operations, operations.query, args);
            });
        } else {
            callback(new TypeError('Second argument needs to be a ViewQuery, SpatialQuery or N1qlQuery. Please use the query factories exposed by chesterfield.'));
        }
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
