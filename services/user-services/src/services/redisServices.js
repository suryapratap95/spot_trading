const redis = require('redis')
const client = redis.createClient({
    socket: {
      host: 'localhost', // Change this to your Redis host if it's running elsewhere
      port: 6379,        // Default Redis port
    },
  });

client.on('error', (err) => {
    console.log('Redis error ' + err)
})

client.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.log('Redis connection error: ' + err);
});

module.exports = {
    setCache: (key, value) => {
        client.set(key, value)
    },
    getCache: (key) => new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

