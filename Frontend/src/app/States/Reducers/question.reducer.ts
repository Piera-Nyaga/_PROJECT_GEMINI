import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Questions } from "src/app/Interfaces/question";
import { addquestionFailure, addquestionSuccess, deletequestionFailure, deletequestionSuccess, loadQuestions, loadQuestionsFailure, loadQuestionsSuccess, loadSingleQuestionId, updatequestionFailure, updatequestionSuccess } from "../Actions/questions.action";


export interface QuestionInterface {
    questions: Questions[];
    Id: string
    successonAdd: string
    erroronAdd: string
    erroronUpdate: string
    successonDelete: string
    erroronDelete: string
    error: string | null;
    // status: 'pending' | 'loading' | 'success' | 'failed';
}

export const intialState: QuestionInterface = {
    questions: [],
    Id: '',
    successonAdd: '',
    erroronAdd: '',
    erroronUpdate: '',
    successonDelete: '',
    erroronDelete: '',
    error: ''
    
};
const questionSliceState= createFeatureSelector<QuestionInterface>('booking')

export const oneQuestion= createSelector(questionSliceState, state=>state.questions)
const oneQuestionId= createSelector(questionSliceState, state=>state.Id)


export const getSingleBooking=createSelector(oneQuestion,oneQuestionId,(state,id)=>{
    return state.find(x=>x.Id===id)
})

export const questionReducerr=createReducer<QuestionInterface>(
    intialState,

    on(loadQuestionsSuccess, (state,action):QuestionInterface=>{
       return {
        ...state,
        error:'',
        questions:action.questions
       } 
    })
    ,on(loadQuestionsFailure, (state,action):QuestionInterface=>{
        return {
         ...state,
         questions:[],
         error:action.error
         
        } 
     })
     ,on(loadSingleQuestionId, (state,action):QuestionInterface=>{
        return {
         ...state,
         Id:action.id
         
        } 
     }),
     on(addquestionSuccess, (state,action):QuestionInterface=>{
        return {
         ...state,
         successonAdd: action.message.message,
         erroronAdd: '',
        
         
        } 
     }),
     on(addquestionFailure, (state,action):QuestionInterface=>{
        return {
         ...state,
         erroronAdd: action.error,
         successonAdd: ''
        
         
        } 
     }),
     on(updatequestionSuccess, (state,action):QuestionInterface=>{

        const updatedQuestion=state.questions.map(item=>{
            return item.Id===action.question.Id?action.question:item
        })

        return {
         ...state,
         erroronUpdate:'',
         questions:updatedQuestion
        
        } 
     }),
     on(updatequestionFailure, (state,action):QuestionInterface=>{

        return {
         ...state,
         erroronUpdate:action.error

        } 
     }),
     on(deletequestionSuccess, (state,action):QuestionInterface=>{

        return {
         ...state,
         successonDelete:action.message.message,
         erroronDelete:''
         
          
        } 
     }),
     on(deletequestionFailure, (state,action):QuestionInterface=>{

        return {
         ...state,
         erroronDelete:action.error,
         successonDelete:''
          
        } 
     })



)

