const  movieQueue = require('../utils/bullConnection');
const db=require('../models/models');
const { Op } = require('sequelize');
const { Worker } = require('bullmq');
const movieWorker = new Worker('movieQueue', async job => {
  console.log(job.data);
  console.log(job.id);

  const currentDateTime = new Date();
  const runAt = new Date(job.data.runAt);
  runAt.setHours(runAt.getHours() + 1);

  await db.cron.update({ ranAt: currentDateTime, runAt: moment().add(1, 'day') }, { where: { cronId: job.data.cronId } })
    .then(() => {
      console.log('ran_at and runAt updated successfully');
    })
    .catch((err) => {
      console.log('Error updating ran_at and runAt:', err);
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
      console.log(err);
    });
}
  
  module.exports = addJobs;