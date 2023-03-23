import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper } from '../Databasehelpers/index'
import { sqlConfig } from '../Config/config'
import mssql from 'mssql'
import { AddAnswerSchema } from '../Helpers/validateAnswer'
import { Answer, Decoded } from '../Models'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: {Description: string, userId: string, questionId: string }
    info?: Decoded
    

}


//POST ANSWER
export async function postAnswer(req: ExtendedRequest, res: Response) {
    try {
        if(req.info){
        const id = uid()
        const createdAt: string = new Date().toISOString()
        const {Description, questionId,userId } = req.body
        const {error}= AddAnswerSchema.validate(req.body)

        if(error){
            return res.status(422).json(error)
        }
        await _db.exec('postAnswer ', { id: id, Description, userId:req.info.Id, questionId:questionId, createdAt })
        return res.status(201).json({ message: 'Answer added' })
    }

    }
    catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL ANSWERS
export const getallAnswers: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const answers= await (await pool.request().execute('getallAnswers')).recordset
        return res.status(200).json(answers)
    } catch (error) {
        return res.status(404).json(error)
    }
}

// GET ONE ANSWER BY ID
export const getoneAnswer = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const answer = await (await _db.exec('getAnswerbyId', { id })).recordset[0]
        if (!answer) {
            return res.status(404).json({ error: 'Answer Not Found' })
        }

        return res.status(200).json(answer)

    } catch (error) {
        return res.status(500).json(error)
    }

}

// MARK PREFFERED
export const approveAnswer = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const {questionId}= req.body
        
        const answer= await (await _db.exec('getAnswerbyId', { id })).recordset[0]
        
            if (answer) {
                await _db.exec('markPreferred', { id: req.params.id })

                const userDetails= await (await _db.exec('getPreferredAnswerDetails')).recordset[0]
        // console.log(userDetails)
                return res.status(201).json({message:'Answer marked as preffered'})
                

            }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

