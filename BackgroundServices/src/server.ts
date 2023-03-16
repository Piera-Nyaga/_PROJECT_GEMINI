import express from 'express'
import cron from 'node-cron'
import sendWelcomeEmail from './Emailservices/index';

const app= express()

cron.schedule('*/30 * * * * *', async() => {
  console.log('running a task every 30 Second');
  await sendWelcomeEmail()
});


app.listen(4002, ()=>{
    console.log('App is Running');
    
})