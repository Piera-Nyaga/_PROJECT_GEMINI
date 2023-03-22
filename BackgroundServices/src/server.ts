import express from 'express'
import cron from 'node-cron'
import sendPreferredEmail from './Emailservices/preferred';
import sendWelcomeEmail from './Emailservices/welcome';

const app= express()

cron.schedule('*/30 * * * * *', async() => {
  console.log('running a task every 30 Second');
  await sendWelcomeEmail(),
  await sendPreferredEmail()
});

app.listen(4002, ()=>{
    console.log('App is Running');
    
})