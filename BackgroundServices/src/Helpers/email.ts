import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


function createTransporter(config:any){
return nodemailer.createTransport(config)
}

let config ={
    host:'smtp.gmail.com',
    service:'gmail',
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}

const sendMail = async(messageOptions:any)=>{
    let transporter =createTransporter(config)
    await transporter.verify()
    await transporter.sendMail(messageOptions, (err, info)=>{
        console.log(info);
        
    })
}

export default sendMail

// let transporter = nodemailer.createTransport({
//     host:'smtp.gmail.com',
//     service:'gmail',
//     port:587,
//     auth:{
//         user:process.env.EMAIL,
//         pass:process.env.PASSWORD
//     }
// })

// const message= {
//     from: process.env.EMAIL,
//     to:"nyagapiera99@gmail.com",
//     subject:"HELLO THERE",
//     text:"Nothing here lady"
// };

// transporter.sendMail(message,(error, info)=>{
//     if (error) {
//         console.log(error)
//     }
//     console.log(info.response)
// })
