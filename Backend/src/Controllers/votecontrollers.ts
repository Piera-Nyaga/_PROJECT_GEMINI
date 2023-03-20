import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper } from '../Databasehelpers/index'
import { sqlConfig } from '../Config/config'
import mssql from 'mssql'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: {vote: string, userId: string, answerId: string }
    params: { id: string }
}


//ADD VOTE
export async function addVote(req: ExtendedRequest, res: Response) {
    try {
        const id = uid()
        const createdAt: string = new Date().toISOString()
        const {vote, userId, answerId} = req.body
    
        await _db.exec('AddOrUpdateVote', { id: id, vote, userId, answerId, createdAt })
        return res.status(201).json({ message: 'Voted Successfully' })

    }
    catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL VOTES
export const getallVotes: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const votes= await (await pool.request().execute('getallVotes')).recordset
        return res.status(200).json(votes)
    } catch (error) {
        return res.status(404).json(error)
    }
}
