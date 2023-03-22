import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { LoginSchema, RegistrationSchema } from '../Helpers/validateUser'
import { Decoded, User } from '../Models/index'
import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from '../Databasehelpers/index'
import { sqlConfig } from '../Config/config'
import mssql from 'mssql'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: { UserName: string, Email: string, Password: string, ConfirmPassword: string }
    info?: Decoded
}


//USER REGISTER
export async function registerUser(req: ExtendedRequest, res: Response) {
    try {
        const id = uid()
        const { UserName, Email, Password} = req.body
        const { error } = RegistrationSchema.validate(req.body)

        if (error) {
            return res.status(422).json(error)
        }
        const hashedPassword= await Bcrypt.hash(Password,10)
        
        await _db.exec('RegisterUser', { id: id, username: UserName, email: Email, password: hashedPassword })
        return res.status(201).json({ message: 'User registered' })
    }
    catch (error) {
        return res.status(500).json({message:'Cannot Register User'})
    }
}


// GET ALL USERS
export const getallusers: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const users: User[] = await (await pool.request().execute('getUsers')).recordset
        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(404).json(error.message)
    }
}


//USER LOGIN
export async function loginUser(req: ExtendedRequest, res: Response) {
    try {
        const { Email, Password } = req.body
        const { error } = LoginSchema.validate(req.body)
        if (error) {
            return res.status(422).json(error.details[0].message)
        }

        const user: User[] = await (await _db.exec('getUserByEmail', { email: Email })).recordset
        if (!user[0]) {
            return res.status(404).json({ error: 'User Not found' })
        }

        const validpassword = await Bcrypt.compare(Password, user[0].Password)
        if (!validpassword) {
            return res.status(404).json({ error: 'Wrong password. Please Try Again' })
        }

        const payload= user.map(item=>{
            const {Password,...rest}=item
            return rest
        })
        const token = jwt.sign(payload[0], process.env.SECRETKEY as string , {expiresIn:'3600s'})
        return res.status(200).json({ message: 'User Loggedin!!!', token, userId: `${user[0].Id}`})

    } catch (error: any) {
        res.status(500).json(error.message)
    }
}

//UPDATE USER payload[0]
export async function updateUser(req: ExtendedRequest, res: Response) {
    try {
        const id = req.params.id
        const { UserName, Email, Password } = req.body

        const user: User = await (await _db.exec('getuserbyId', { id })).recordset[0]

        user.UserName = req.body.UserName;
        user.Email = req.body.Email;
        user.Password = req.body.Password;


        if (req) {
            if (user) {
                await _db.exec('UpdateUser', { id: req.params.id, username: UserName, email: Email, password: Password })
                const updatedUser: User = await (await _db.exec('getuserbyId', { id })).recordset[0]
                return res.status(201).json(updatedUser)
            }
        }
        return res.status(404).json({ error: 'User Not Found' })
    }
    catch (error) {
        res.status(500).json(error)
    }

}

// DELETE USER
export const deleteUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const id = req.params.id
        const user: User = await (await _db.exec('getuserbyId', { id })).recordset[0]

        if (req) {
            if (user) {
                await _db.exec('deleteUser', { id: req.params.id })
                return res.status(201).json({ message: 'User Deleted' })
            }
        }
        return res.status(404).json({ error: 'User Not Found' })
    }

    catch (error) {
        res.status(500).json(error)
    }
}
