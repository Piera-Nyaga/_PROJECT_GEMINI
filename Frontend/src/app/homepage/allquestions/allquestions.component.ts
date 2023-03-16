import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadQuestions } from '../../States/Actions/questions.action';
import { Question } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-allquestions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllquestionsComponent {

  question:Question[]=[]

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute){}


ngOnInit(): void {
  this.question = this.questionService.getQuiz()
  // console.log(this.questionService.getQuiz());
}

getOneQuiz(id:string){
  let one:Question
  this.questionService.getOneQuiz(id)
}

  
}
