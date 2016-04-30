var couchbase = require('couchbase');

module.exports = {
    append: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.append(key, value, callback);
        });
    },
    cluster: function (clusterDsn, options) {
        return new couchbase.Cluster(clusterDsn, options);
    },
    counter: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.counter(key, value, callback);
        });
    },
    get: function (bucketAgent, key, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.get(key, callback);
        });
    },
    getReplica: function (bucketAgent, key, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.getReplica(key, callback);
        });
    },
    getMulti: function (bucketAgent, keys, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.getMulti(keys, callback);
        });
    },
    insert: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.insert(key, value, callback);
        });
    },
    openBucket: function (cluster, bucketName, password) {
        var bucket = cluster.openBucket(bucketName, password);

        function bucketAgent(bucket, callback) {
            if (bucket.isConnected) {
                callback(null, bucket);
            }

            bucket.on('connect', function () {
                callback(null, bucket);
            });

            bucket.on('error', function (err) {
                callback(err);
            });
        }

        return bucketAgent.bind(null, bucket);
    },
    prepend: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.prepend(key, value, callback);
        });
    },
    query: function (bucketAgent, query, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.query(query, callback);
        });
    },
    remove: function (bucketAgent, key, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.remove(key, callback);
        });
    },
    replace: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.replace(key, value, callback);
        });
    },
    upsert: function (bucketAgent, key, value, callback) {
        bucketAgent(function (error, bucket) {
            if (error)
                callback(error);

            bucket.upsert(key, value, callback);
        });
    }
};
