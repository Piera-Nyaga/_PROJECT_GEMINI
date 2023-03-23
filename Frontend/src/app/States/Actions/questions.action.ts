import { createAction, props } from "@ngrx/store"
import { Questions, addQuestion, Message } from "src/app/Interfaces/question"



export const loadQuestions = createAction('[allQuestions]-loadQuestions')

export const loadQuestionsSuccess = createAction('[allQuestions]-loadQuestionsSuccess', props<{ questions:Questions[] }>())

export const loadQuestionsFailure= createAction('[allQuestions]-loadQuestionsFailure',props<{error:string}>())

export const loadSingleQuestionId= createAction('[oneQuestion]-load Single Question by Id',props<{id:string}>())


export const loadSingleQuestion = createAction('[oneQuestion]-loadSingleQuestion',props<{id:string}>())

export const loadSingleQuestionSuccess = createAction('[oneQuestion]-loadSingleQuestionSuccess', props<{ question:Questions}>())

export const loadSingleQuestionFailure= createAction('[oneQuestion]-loadSingleQuestionFailure',props<{error:string}>())



export const loadUserQuestions = createAction('[userQuestions]-loadUserQuestions')

export const loadUserQuestionsSuccess = createAction('[userQuestions]-loadUserQuestionsSuccess', props<{ questions:Questions[] }>())

export const loadUserQuestionsFailure= createAction('[userQuestions]-loadUserQuestionsFailure',props<{error:string}>())


export const addquestion = createAction('[addquestion]-addquestion',props<{addedQuestion:addQuestion}>())

export const addquestionSuccess = createAction('[addquestion]-addquestionSuccess',props<{message:Message}>())

export const addquestionFailure = createAction('[addquestion]-addquestionFailure',props<{error:string}>())


export const updatequestion = createAction('[updatequestion]-updatequestion',props<{updatedQuestion:addQuestion, id:string}>())

export const updatequestionSuccess = createAction('[updatequestion]-updatequestionSuccess',props<{question:Questions}>())

export const updatequestionFailure = createAction('[updatequestion]-updatequestionFailure',props<{error:string}>())


export const deletequestion = createAction('[deletequestion]-deletequestion',props<{id:string}>())

export const deletequestionSuccess = createAction('[deletequestion]-deletequestionSuccess',props<{message:Message}>())

export const deletequestionFailure = createAction('[deletequestion]-deletequestionFailure',props<{error:string}>())



