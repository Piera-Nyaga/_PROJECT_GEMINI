import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Questions } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent {
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
