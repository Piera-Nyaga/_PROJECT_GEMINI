import { Router } from "express";
import { loginUser, registerUser, getallusers,updateUser,deleteUser } from "../Controllers/authcontrollers";

const authroute =Router()

authroute.post('/register',registerUser)
authroute.post('/login', loginUser)
authroute.get('/allusers', getallusers)
authroute.patch('/update/:id', updateUser)
authroute.delete('/delete/:id', deleteUser)


export default authroute