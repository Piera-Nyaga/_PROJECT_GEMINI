import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Questions } from '../../Interfaces/question';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-onequestion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './onequestion.component.html',
  styleUrls: ['./onequestion.component.css']
})

export class OnequestionComponent implements OnInit{
 question?:Questions;
 id!:string

 constructor(private route:ActivatedRoute, private questionService:QuestionService,private router:Router){

 }


  shqQuiz=false;

  shAnsw = false;

  ShowQuestion(){
    this.shqQuiz=!this.shqQuiz
  }

  showAnsw(){
    this.shAnsw=!this.shAnsw
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id']
      this.questionService.getOneQuiz(params['id']).subscribe((question)=>
        this.question=question
      ) 
  })
  }

  Update(){
    this.router.navigate([`../../edit/${this.id}`],{relativeTo:this.route})
    }


}
