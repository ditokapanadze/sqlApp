// const redis = require("redis");

// const client = redis.createClient();

const Redis = require("ioredis");

const client = new Redis();
module.exports = client;
