import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent {
  question?:Question;
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
      this.question= this.questionService.getOneQuiz(params['id'])
    })
     
  }

  Update(){
    this.router.navigate([`../../edit/${this.id}`],{relativeTo:this.route})
    }


}
