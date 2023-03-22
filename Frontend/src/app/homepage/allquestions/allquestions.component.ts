import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadQuestions } from '../../States/Actions/questions.action';
import { Questions } from '../../Interfaces/question';
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

  questions:Questions[]=[]

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute){}


ngOnInit(): void {
  this.questionService.getQuiz().subscribe((questions)=>{
  this.questions=questions
  // console.log(this.questions);
})
  
  
}

getOneQuiz(id:string){
  this.questionService.getOneQuiz(id)
}

  
}
