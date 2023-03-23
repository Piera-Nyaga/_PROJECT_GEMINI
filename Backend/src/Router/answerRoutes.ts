import { Router } from "express";
import { postAnswer,getallAnswers,getoneAnswer,approveAnswer } from "../Controllers/answercontrollers";
import { VerifyToken } from "../Middlewares/verify";

const answerroute =Router()

answerroute.post('/post',VerifyToken,postAnswer)
answerroute.get('/allanswers',getallAnswers)
// answerroute.get('/answer/:id',getoneAnswer)
// answerroute.patch('/preferred/:id', approveAnswer)

export default answerroute