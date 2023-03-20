
import express, { json } from 'express'
import authroute from './Router/userRoutes'
import cors from 'cors'
import questionroute from './Router/questionRoutes'
import answerroute from './Router/answerRoutes'
import commentroute from './Router/commentRoutes'
import voteroute from './Router/voteRoutes'

const app= express()

app.use(cors())
app.use(json()) 

app.use('/users',authroute)
app.use('/questions',questionroute)
app.use('/answers',answerroute)
app.use('/comments',commentroute)
app.use('/votes',voteroute)


app.listen(4000,()=>{
console.log(" I am running on port 4000...");

})

