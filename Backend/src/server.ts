
import express, { json } from 'express'
import authroute from './Router/userRoutes'
import cors from 'cors'
import questionroute from './Router/questionRoutes'
import answerroute from './Router/answerRoutes'
const app= express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request

app.use('/users',authroute)
app.use('/questions',questionroute)
app.use('/answers',answerroute)


app.listen(4000,()=>{
console.log("Running ...");

})

