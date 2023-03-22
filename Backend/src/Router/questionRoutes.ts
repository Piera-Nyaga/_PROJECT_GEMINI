import { Router } from "express";
import { postQuestion,getallQuestions,getoneQuestion,getUserQuestions,updateQuestion,deleteQuestion } from "../Controllers/questioncontrollers";

const questionroute =Router()

questionroute.post('/post',postQuestion)
questionroute.get('/allquestions',getallQuestions)
questionroute.get('/questions/:id',getoneQuestion)
questionroute.get('/questions/:id',getoneQuestion)
questionroute.get('/myquestions/:userId',getUserQuestions)
questionroute.patch('/update/:id',updateQuestion)
questionroute.delete('/delete/:id',deleteQuestion)



export default questionroute