import { UserInterface } from "../app/States/Reducers/user.reducer";
import { QuestionInterface } from "../app/States/Reducers/question.reducer";
export interface AppState{
    user:UserInterface  
    question:QuestionInterface
}