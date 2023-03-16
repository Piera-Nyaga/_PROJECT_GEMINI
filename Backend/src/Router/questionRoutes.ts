import { Router } from "express";
import { postQuestion,getallQuestions,getoneQuestion,updateQuestion,deleteQuestion } from "../Controllers/questioncontrollers";




const questionroute =Router()

questionroute.post('/post',postQuestion)
questionroute.get('/allquestions',getallQuestions)
questionroute.get('/onequestion/:id',getoneQuestion)
questionroute.patch('/update/:id',updateQuestion)
questionroute.delete('/delete/:id',deleteQuestion)



export default questionroute