export interface addQuestion{
    // Id:string
    Title:string
    Description:string
    Code?:string
    // createdAt:string
}

export interface Questions{
    Id:string
    Title:string
    Description:string
    Code?:string
    createdAt:string
    userId:string
    answer:Answer[]
    
}
export interface Message{
    message:string
}
export interface addAnswer{
    // Id:string
    Description:string
    // createdAt:string
}
export interface Answer{
    Id:string
    Description:string
    Code?:string
    createdAt:string
    votes:Vote[]
    comment:Comment[]
    userId:string
    questionId:string
}

export interface addComment{
    // Id:string
    Description:string
    // createdAt:string
}
export interface Comment{
    Id:string
    Description:string
    createdAt:string
    userId:string
    answerId:string

}

export interface Vote{
    Id:string
    vote: boolean
    answerId:string
    userId:string
}

