import { createReducer, on } from "@ngrx/store";
import { Question } from "src/app/Interfaces/question";
import { loadQuestions } from "../Actions/questions.action";


export interface QuestionInterface{
    questions:Question[];
    error:string | null;
    status:'pending' | 'loading' | 'success' | 'failed';
}

export const intialState: QuestionInterface = {
    questions: [],
    error: '',
    status: "pending"
};

export const questionReducer= createReducer(
intialState,

on(loadQuestions,(state) =>({...state, status: 'loading'}))


)