import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { PostingSchema, UpdateSchema } from '../Helpers/validateQuiz'
import { Question } from '../Models/index'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper } from '../Databasehelpers/index'
import { sqlConfig } from '../Config/config'
import mssql from 'mssql'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: { Title: string, Description: string, Code: string, userId: string }
    params: { id: string }
}


//POST QUESTION
export async function postQuestion(req: ExtendedRequest, res: Response) {
    try {
        const id = uid()
        const createdAt: string = new Date().toISOString()
        const { Title, Description, Code, userId, } = req.body
        const { error } = PostingSchema.validate(req.body)

        if (error) {
            return res.status(422).json(error.details[0].message)
        }
        await _db.exec('InsertOrUpdateQuiz ', { id: id, Title: Title, Description: Description, Code: Code, userId: userId, createdAt })
        return res.status(201).json({ message: 'Question Posted' })

    }
    catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL QUESTIONS
export const getallQuestions: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const user: Question[] = await (await pool.request().execute('getQuestions')).recordset
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json(error)
    }
}

// GET ONE QUESTION BY ID
export const getoneQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const question: Question = await (await _db.exec('getquestionbyId', { id })).recordset[0]
        if (!question) {
            return res.status(404).json({ error: 'Question Not Found' })
        }

        return res.status(200).json(question)

    } catch (error) {
        return res.status(500).json(error)
    }

}

// UPDATE QUESTION
export const updateQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const createdAt: string = new Date().toISOString()
        const { Title, Description, Code } = req.body
        //   console.log(req.body);


        const question: Question = await (await _db.exec('getquestionbyId', { id })).recordset[0]
        question.Title = req.body.Title;
        question.Description = req.body.Description;
        question.Code = req.body.Code;

        if (req) {
            if (question) {
                await _db.exec('UpdateQuiz', { id: req.params.id, Title, Description, Code, createdAt })
                const updatedQuestion: Question = await (await _db.exec('getquestionbyId', { id })).recordset[0]
                return res.status(201).json(updatedQuestion)
            }
        }
        return res.status(404).json({ error: 'Question Not Found' })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// DELETE QUESTION

export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const question: Question = await (await _db.exec('getquestionbyId', { id })).recordset[0]

        if (req) {
            if (question) {
                await _db.exec('deleteQuiz', { id: req.params.id})
                return res.status(201).json({message:'Question Deleted'})
            }
        }
        return res.status(404).json({ error: 'Question Not Found' })
    }

        catch (error) {
            res.status(500).json(error)
        }
    }
