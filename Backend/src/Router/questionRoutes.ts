import { Router } from "express";
import { postQuestion,getallQuestions,getoneQuestion,getUserQuestions,updateQuestion,deleteQuestion } from "../Controllers/questioncontrollers";
import { VerifyToken } from "../Middlewares/verify";

const questionroute =Router()

questionroute.post('/post',VerifyToken, postQuestion)
questionroute.get('/allquestions',VerifyToken,getallQuestions)
// questionroute.get('/questions/:id',VerifyToken,getoneQuestion)
questionroute.get('/questions/:id',VerifyToken,getoneQuestion)
questionroute.get('/myquestions/user',VerifyToken,getUserQuestions)
questionroute.patch('/update/:id',VerifyToken,updateQuestion)
questionroute.delete('/delete/:id',VerifyToken,deleteQuestion)



export default questionroute