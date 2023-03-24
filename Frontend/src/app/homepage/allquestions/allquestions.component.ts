import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadQuestions, loadSingleQuestionId } from '../../States/Actions/questions.action';
import { Answer, Questions } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { allQuestions } from 'src/app/States/Reducers/question.reducer';
import { ShortenPipe } from "../../shorten.pipe";


@Component({
    selector: 'app-allquestions',
    standalone: true,
    templateUrl: './allquestions.component.html',
    styleUrls: ['./allquestions.component.css'],
    imports: [CommonModule, RouterModule, ShortenPipe]
})
export class AllquestionsComponent {

  questions:Questions[]=[]
  answers:Answer[]=[]
  id!:string

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute, private store:Store<AppState>){}


ngOnInit(): void {
  this.store.dispatch(loadQuestions())
  this.store.select(allQuestions).subscribe((questions)=>
  this.questions=questions)
  
}

  
getOneQuiz(){
  this.store.dispatch(loadSingleQuestionId({id:this.id})) 
}
}




