import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Questions } from "src/app/Interfaces/question";
import { addquestionFailure, addquestionSuccess, deletequestionFailure, deletequestionSuccess,loadUserQuestionsSuccess, loadUserQuestionsFailure, loadQuestionsFailure, loadQuestionsSuccess, loadSingleQuestionId, updatequestionFailure, updatequestionSuccess, loadSingleQuestionSuccess, loadSingleQuestionFailure } from "../Actions/questions.action";


export interface QuestionInterface {
    questions: Questions[];
    userQuestions:Questions[];
    questionId: string
    singleQuestion:Questions|null,
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
    userQuestions:[],
    questionId: '',
    singleQuestion:null,
    successonAdd: '',
    erroronAdd: '',
    erroronUpdate: '',
    successonDelete: '',
    erroronDelete: '',
    error: ''
    
};
const questionSliceState= createFeatureSelector<QuestionInterface>('question')

export const allQuestions= createSelector(questionSliceState, state=>state.questions)
export const myQuestions= createSelector(questionSliceState, state=>state.userQuestions)

const oneQuestion= createSelector(questionSliceState, state=>state.questionId)
export const fullquestion=createSelector(questionSliceState, state=>state.singleQuestion)
export const getSingleQuestion =createSelector(questionSliceState, state=>state.singleQuestion)
export const getOneQuestion=createSelector(allQuestions,oneQuestion,(state,id)=>{
return state.find(z=>z.Id==id)
})

export const questionReducer=createReducer<QuestionInterface>(
    intialState,

    on(loadQuestionsSuccess, (state,action):QuestionInterface=>{
       return {
        ...state,
        error:'',
        questions:action.questions
       } 
    }),
    on(loadQuestionsFailure, (state,action):QuestionInterface=>{
        return {
         ...state,
         questions:[],
         error:action.error
         
        } 
     }),
     on(loadSingleQuestionSuccess,(state,action):QuestionInterface=>{
      return{
      ...state,
      error:'',
      singleQuestion:action.question
   }

     }),
     on(loadSingleQuestionFailure,(state,action):QuestionInterface=>{
      return{
      ...state,
      error:action.error,
      singleQuestion:null
   }

     }),
     on(loadUserQuestionsSuccess, (state,action):QuestionInterface=>{
      return {
       ...state,
       error:'',
       userQuestions:action.questions
      } 
   }),
   on(loadUserQuestionsFailure, (state,action):QuestionInterface=>{
       return {
        ...state,
        userQuestions:[],
        error:action.error
        
       } 
    }),
     on(loadSingleQuestionId, (state,action):QuestionInterface=>{
        return {
         ...state,
         questionId:action.id
         
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

