import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Questions } from 'src/app/Interfaces/question';
import { QuestionService } from 'src/app/Services/QuestionsService/questionservice';

@Component({
  selector: 'app-allmyquestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allmyquestions.component.html',
  styleUrls: ['./allmyquestions.component.css']
})
export class AllmyquestionsComponent {
  questions:Questions[]=[]

constructor(private questionService:QuestionService, private router:Router, private route:ActivatedRoute){}


ngOnInit(): void {
  this.questionService.getmyQuiz().subscribe((questions)=>{
    this.questions=questions
      console.log("quesions",this.questions)

  })
}

}
