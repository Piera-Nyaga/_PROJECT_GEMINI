import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Question } from '../../Interfaces/question';

@Component({
  selector: 'app-myquestions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent{
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
