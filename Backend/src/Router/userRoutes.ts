import { Router } from "express";
import { Homepage, loginUser, registerUser, getallusers,updateUser,deleteUser } from "../Controllers/authcontrollers";
import { VerifyToken } from "../Middlewares/verify"



const authroute =Router()

authroute.post('/register',registerUser)
authroute.post('/login', loginUser)
authroute.get('/allusers', getallusers)
authroute.patch('/update/:email', updateUser)
authroute.delete('/delete/:id', deleteUser)

// authroute.post('/deactivateuser', deactivateuser)
// authroute.get('/home',VerifyToken, Homepage)//protected Route

export default authroute