const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});

const visits_cache = 'visits'
redisClient.set(visits_cache, 0);

app.get('/', (req, res) => {
    redisClient.get(visits_cache, (err, visits) => {
        res.send(`Number of visits: ${visits}`);
        redisClient.set(visits_cache, (parseInt(visits) + 1));
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081.');
});