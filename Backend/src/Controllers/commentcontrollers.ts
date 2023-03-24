import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper } from '../Databasehelpers/index'
import { sqlConfig } from '../Config/config'
import mssql from 'mssql'
import { AddCommentSchema } from '../Helpers/validateComment'
import { DecodedData } from '../Models'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: {Description: string, userId: string, answerId: string}
    info:DecodedData
}


//POST COMMENT
export async function addComment(req: ExtendedRequest, res: Response) {
    try {
        if(req.info){
        const id = uid()
        const createdAt: string = new Date().toISOString()
        const {Description, userId, answerId } = req.body
        const{error} =AddCommentSchema.validate(req.body)
        
        if (error) {
            return res.status(422).json(error)
        }
        await _db.exec('addComment ', { id: id, Description, userId:req.info.Id, answerId:answerId, createdAt })
        return res.status(201).json({ message: 'Comment added' })
    }}
    catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL COMMENTS
export const getallComments: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const comments= await (await pool.request().execute('getallComments')).recordset
        return res.status(200).json(comments)
    } 
    catch (error) {
        return res.status(404).json(error)
    }
}

// GET ONE COMMENT BY ID
export const getoneComment = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const comment = await (await _db.exec('getCommentbyId', { id })).recordset[0]

        if (!comment) {
            return res.status(404).json({ error: 'Comment Not Found' })
        }
        return res.status(200).json(comment)
    } 
    catch (error) {
        return res.status(500).json(error)
    }

}