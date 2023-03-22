import { RequestHandler,Request,Response,NextFunction } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DecodedData } from '../Models/index'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request{
info?:DecodedData
}

export function VerifyToken (req:ExtendedRequest, res:Response,next:NextFunction){
const token = req.headers['authorization'] as  string
const tok = token.split(" ")
const realToken = tok[1]
try {                                         
    
    if(!token){
        return res.status(401).json({error:'Forbidden'})
    }
    const Payloadata= jwt.verify(realToken, process.env.SECRETKEY as string) as DecodedData
    req.info= Payloadata
    console.log(Payloadata);
    
    } 
catch (error:any) {
   res.status(403).json(error.message) 
}
next()
}