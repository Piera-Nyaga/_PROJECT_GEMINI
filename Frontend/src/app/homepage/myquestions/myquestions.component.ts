import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import {Questions } from '../../Interfaces/question';

@Component({
  selector: 'app-myquestions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit{
  questions:Questions[]=[]
  userId!:string

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute){}


ngOnInit(): void {
  this.route.params.subscribe((params:Params)=>{
    this.userId=params['userId']

    this.questionService.getmyQuiz(params['userId']).subscribe((questions)=>
      this.questions=questions
    ) 
})
   
}

getOneQuiz(id:string){
  // let oneQuestion
  this.questionService.getOneQuiz(id)
}
}
