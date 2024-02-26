const  movieQueue = require('../utils/bullConnection');
const db=require('../models/models');
const { Op } = require('sequelize');
const { Worker } = require('bullmq');
const logger = require('../utils/logConnection');
const movieWorker = new Worker('movieQueue', async job => {
  const currentDateTime = new Date();
  const runAt = new Date(job.data.runAt);
  runAt.setHours(runAt.getHours() + 1);

  await db.cron.update({ ranAt: currentDateTime, runAt: moment().add(1, 'day') }, { where: { cronId: job.data.cronId } })
    .then(() => {
      logger.info('ran_at and runAt updated successfully');
    })
    .catch((err) => {
      logger.error('Error updating ran_at and runAt:', err);
    });
}, { connection: { host: 'localhost', port: 6379 } });







async function addJobs() {
  db.cron.findAll({
    where:{
      runAt: {[Op.lt]:(new Date())},
    }}
  ).then((data)=>{
    for(let i=0;i<data.length;i++){
      movieQueue.add(`job${i}`, { cronId: data[i].cronId, cronName: data[i].cronName, runAt: data[i].runAt });
      

    }}).catch((err)=>{
      logger.error(err);
    });
}
  
  module.exports = addJobs;