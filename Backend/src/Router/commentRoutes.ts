import { Router } from "express";
import {addComment,getallComments,getoneComment } from "../Controllers/commentcontrollers";

const commentroute =Router()

commentroute.post('/post',addComment)
commentroute.get('/allcomments',getallComments)
commentroute.get('/comment/:id', getoneComment)
export default commentroute