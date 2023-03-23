import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, switchMap } from "rxjs";
import { AdminService } from "src/app/admin/adminService";
import { QuestionService } from "src/app/Services/QuestionsService/questionservice";
import * as QuestionsActions from '../Actions/questions.action'

@Injectable()
export class QuestionEffect {

    constructor(private questionService: QuestionService, private actions$: Actions, private adminService: AdminService) { }

    loadQuestions = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.loadQuestions),
            mergeMap(() => {
                return this.questionService.getQuiz().pipe(
                    map(questions => {
                        return QuestionsActions.loadQuestionsSuccess({ questions })
                    }),
                    catchError(error => of(QuestionsActions.loadQuestionsFailure({ error: error.message })))
                )
            })
        )
    })

    userQuestions = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.loadUserQuestions),
            mergeMap(() => {
                return this.questionService.getmyQuiz().pipe(
                    map(questions => {
                        return QuestionsActions.loadUserQuestionsSuccess({ questions })
                    }),
                    catchError(error => of(QuestionsActions.loadUserQuestionsFailure({ error: error.message })))
                )
            })
        )
    })

    fullQuestions = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.loadSingleQuestion),
            mergeMap(action => {
                return this.questionService.getOneQuiz(action.id).pipe(
                    map(question => {
                        return QuestionsActions.loadSingleQuestionSuccess({ question })
                    }),
                    catchError(error => of(QuestionsActions.loadSingleQuestionFailure({ error: error.message })))
                )
            })
        )
    })

    addQuestion = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.addquestion),
            concatMap(action => {
                return this.questionService.addQuiz(action.addedQuestion).pipe(
                    map(successResponse => {
                        return QuestionsActions.addquestionSuccess({ message: successResponse })
                    }),
                    catchError(error => of(QuestionsActions.addquestionFailure({ error: error.message })))
                )
            }),
            switchMap(() => [QuestionsActions.loadQuestions()])
            // switchMap(()=>[QuestionsActions.loadQuestions])
        )
    })


    updateQuestion = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.updatequestion),
            concatMap(action => {
                return this.questionService.updateQuiz(action.id, action.updatedQuestion).pipe(
                    map(successResponse => {
                        return QuestionsActions.updatequestionSuccess({ question: successResponse })
                    }),
                    catchError(error => of(QuestionsActions.updatequestionFailure({ error: error.message })))
                )
            }),
            switchMap(() => [QuestionsActions.loadQuestions()])
        )
    })

    deleteQuestion = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionsActions.deletequestion),
            concatMap(action => {
                return this.adminService.deleteQuiz(action.id).pipe(
                    map(successResponse => {

                        return QuestionsActions.deletequestionSuccess({ message: successResponse })
                    }),
                    catchError(error => of(QuestionsActions.deletequestionFailure({ error: error.message })))
                )
            }),
            switchMap(() => [QuestionsActions.loadQuestions()])
        )
    })

}