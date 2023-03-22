import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Questions } from "src/app/Interfaces/question";
import { addquestionFailure, addquestionSuccess, deletequestionFailure, deletequestionSuccess,loadQuestionsFailure, loadQuestionsSuccess, loadSingleQuestionId, updatequestionFailure, updatequestionSuccess } from "../Actions/questions.action";


export interface QuestionInterface {
    questions: Questions[];
    Id: string
    addSuccess: string
    addError: string
    updateError: string
    deleteSuccess: string
    deleteError: string
    error: string | null;
    // status: 'pending' | 'loading' | 'success' | 'failed';
}

export const intialState: QuestionInterface = {
    questions: [],
    Id: '',
    addSuccess: '',
    addError: '',
    updateError: '',
    deleteSuccess: '',
    deleteError: '',
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
         addSuccess: action.message.message,
         addError: '',
        
         
        } 
     }),
     on(addquestionFailure, (state,action):QuestionInterface=>{
        return {
         ...state,
         addError: action.error,
         addSuccess: ''
        
         
        } 
     }),
     on(updatequestionSuccess, (state,action):QuestionInterface=>{

        const updatedQuestion=state.questions.map(item=>{
            return item.Id===action.question.Id?action.question:item
        })

        return {
         ...state,
         updateError:'',
         questions:updatedQuestion
        
        } 
     }),
     on(updatequestionFailure, (state,action):QuestionInterface=>{

        return {
         ...state,
         updateError:action.error

        } 
     }),
     on(deletequestionSuccess, (state,action):QuestionInterface=>{

        return {
         ...state,
         deleteSuccess:action.message.message,
         deleteError:''
         
          
        } 
     }),
     on(deletequestionFailure, (state,action):QuestionInterface=>{

        return {
         ...state,
         deleteError:action.error,
         deleteSuccess:''
          
        } 
     })



)

