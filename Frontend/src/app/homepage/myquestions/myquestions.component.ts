import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import {Answer, Questions } from '../../Interfaces/question';
import { loadSingleQuestionId, loadUserQuestions } from 'src/app/States/Actions/questions.action';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { myQuestions } from 'src/app/States/Reducers/question.reducer';

@Component({
  selector: 'app-myquestions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit{
  questions:Questions[]=[]
  answers:Answer[]=[]
  id!:string

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute, private store:Store<AppState>){}


ngOnInit(): void {

  this.store.dispatch(loadUserQuestions())
  this.store.select(myQuestions).subscribe((questions)=>
  this.questions=questions)

//   this.questionService.getmyQuiz().subscribe((questions)=>{
//     this.questions=questions
//     console.log("quesions",this.questions);
//   })
//   this.route.params.subscribe((params:Params)=>{
//     this.questionService.getmyQuiz().subscribe((questions)=>{
//       this.questions=questions  
//     })    
// })
}
getOneQuiz(){
  this.store.dispatch(loadSingleQuestionId({id:this.id})) 
}
// getOneQuiz(id:string){
//   this.questionService.getOneQuiz(id)
// }
}
