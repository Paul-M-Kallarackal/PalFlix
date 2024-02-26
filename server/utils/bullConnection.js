const { Queue } = require('bullmq');

const movieQueue = new Queue('movieQueue', {
  connection: {
    host: 'localhost',
    port: 6379
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  }});

module.exports = movieQueue;



