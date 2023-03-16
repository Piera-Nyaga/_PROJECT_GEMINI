export interface Question{
    id:string
    title:string
    description:string
    code?:string
    createdAt:string
}

interface Questionn{
    id:string
    title:string
    description:string
    code?:string
    createdAt:string
    user_Id:string
    answer:Answer[]
    
}
interface Answer{
    id:string
    description:string
    code?:string
    createdAt:string
    votes:Vote[]
    comment:Comment[]
    user_id:string
    question_id:string
}

interface Comment{
    id:string
    description:string
    createdAt:string
    user_id:string
    answer_id:string

}

interface Vote{
    id:string
    vote: boolean
    answer_id:string
    user_ID:string
}

