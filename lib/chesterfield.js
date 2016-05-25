var couchbase = require('couchbase');

module.exports = {
    append: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.append(key, value, callback);
        });
    },
    cluster: function (clusterDsn, options) {
        return new couchbase.Cluster(clusterDsn, options);
    },
    counter: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.counter(key, value, callback);
        });
    },
    get: function (bucket, key, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.get(key, callback);
        });
    },
    getReplica: function (bucket, key, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.getReplica(key, callback);
        });
    },
    getMulti: function (bucket, keys, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.getMulti(keys, callback);
        });
    },
    insert: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.insert(key, value, callback);
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
    prepend: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.prepend(key, value, callback);
        });
    },
    query: function (bucket, query, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.query(query, callback);
        });
    },
    remove: function (bucket, key, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.remove(key, callback);
        });
    },
    replace: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.replace(key, value, callback);
        });
    },
    upsert: function (bucket, key, value, callback) {
        bucket(function (error, bucket) {
            if (error) {
                callback(error);
                return;
            }

            bucket.upsert(key, value, callback);
        });
    }
};
