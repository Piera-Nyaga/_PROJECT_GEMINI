import ejs from 'ejs'
import sendMail from '../Helpers/email';
import mssql from 'mssql'
import { sqlConfig } from '../Config/index';

interface User{
Id:string
UserName:string                       
Email:string
Password:string
Role:string
isActive:string
isSent:string
createdAt:Date
}
const sendWelcomeEmail = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:User[]= await(await pool.request().
    query("SELECT * FROM Users WHERE isSent =0")).recordset
    
for(let user of users){
    ejs.renderFile('templates/index.ejs',{name:user.UserName}, async(error, html)=>{
    const message = {
    from: process.env.EMAIL,
    to: user.Email,
    subject: "REGISTRATION SUCCESSFUL",
    html
};

// console.log(html);

 try {
await sendMail(message) 
await pool.request().query(`UPDATE Users SET isSent =1 WHERE userId ='${user.Id}'`)
 } catch (error) {
    console.log(error);
    
 }  
})
}    
}

export default sendWelcomeEmail

