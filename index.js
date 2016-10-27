'use strict';

var redis = require('redis');

var SlidingCounter = {};

var defaultPort = 6379;
var defaultHost = '127.0.0.1';

var redisClient;

SlidingCounter.configure = function(port, host, options) {
    port = port || 6379;
    host = host || '127.0.0.1';

    redisClient = redis.createClient(port, host, options);
};

function _checkRedisClient() {
    if(!redisClient){
        redisClient = redis.createClient(defaultPort, defaultHost);
    }
}

function _getCardinality(key, callback) {
    _checkRedisClient();
    redisClient.zcard(key, callback);
}

//to prevent same millisecond increments
function makeid(timems){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return timems+text;
}

SlidingCounter.increment = function(key, windowInSeconds, callback) {

    _checkRedisClient();

    var now = new Date().getTime();
    var expires = now - (windowInSeconds * 1000);

    redisClient.multi([
        ["zremrangebyscore", key, '-inf', expires],
        ["zadd", key, now , makeid(now)],
        ["expire", key, "86400"]  //1 day
    ]).exec(function (err, replies) {
        return callback(err, replies);
    });
};

SlidingCounter.count = function(key, callback) {
    _getCardinality(key, callback);
};

module.exports = SlidingCounter;
