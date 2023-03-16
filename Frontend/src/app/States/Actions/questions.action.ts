import { createAction, props } from "@ngrx/store"
import { Question } from "src/app/Interfaces/question"



export const loadQuestions = createAction('[allQuestions]-loadQuestions')

export const loadQuestionsSuccess = createAction('[allQuestions]-load Questions Success', props<{ questions:Question[] }>())

export const loadQuestionsFail= createAction('[allQuestions]-load Questions Fail',props<{error:string}>())

export const loadSingleQuestionId= createAction('[oneQuestion]-load Single Question by Id',props<{id:string}>())




