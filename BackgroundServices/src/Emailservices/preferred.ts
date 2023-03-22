import ejs from 'ejs'
import sendMail from '../Helpers/email';
import mssql from 'mssql'
import { sqlConfig } from '../Config/index';

interface User {
    UserName: string
    Email: string
}

interface Answer {
    Id: string
    Description: string
    userId: string
    questionId: string
    isPreferred: string
    isSent: string
    createdAt: Date
}

const sendPreferredEmail = async () => {
    const pool = await mssql.connect(sqlConfig)

    const user: User[] = await (await pool.request().execute("getPreferredAnswerDetails")).recordset
    // console.log(user)
    const preferredAnswers: Answer[] = await (await pool.request().execute("getPreferredAnswers")).recordset
    // console.log(preferredAnswers)
    for (let answer of preferredAnswers) {
        console.log(answer)

        for (let one of user) {
            console.log(one.Email)
            ejs.renderFile('templates/preferred.ejs', { name: one.UserName }, async (error, html) => {
                const message = {
                    from: process.env.EMAIL,
                    to: one.Email,
                    subject: "ANSWER MARKED AS PREFERRED",
                    html
                };

                try {
                    await sendMail(message)
                    await pool.request().query(`UPDATE Answers SET isSent = 1 WHERE Id='${answer.Id}'`)
                } catch (error) {
                    console.log(error);
                }
            })
        }
    }
}

export default sendPreferredEmail

