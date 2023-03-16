import { Router } from "express";
import { postAnswer,getallAnswers,getoneAnswer,approveAnswer } from "../Controllers/answercontrollers";

const answerroute =Router()

answerroute.post('/post',postAnswer)
answerroute.get('/allanswers',getallAnswers)
answerroute.get('/oneanswer/:id',getoneAnswer)
answerroute.patch('/preferred/:id', approveAnswer)

export default answerroute