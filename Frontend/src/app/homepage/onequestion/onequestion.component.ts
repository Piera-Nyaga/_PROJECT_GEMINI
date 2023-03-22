import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Questions, Answer } from '../../Interfaces/question';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userSlice } from "../../States/Reducers/user.reducer";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-onequestion',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './onequestion.component.html',
  styleUrls: ['./onequestion.component.css']
})

export class OnequestionComponent implements OnInit{
 question?:Questions;
 answer?:Answer;
 id!:string
 userId:string=''

 constructor(private route:ActivatedRoute, private questionService:QuestionService,private router:Router, private fb:FormBuilder, private store:Store<AppState>){}
 form!: FormGroup;
 form1!:FormGroup;
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
      {
        if(question){
          this.question=question
          // this.userId= question.userId
        } 
      }
      ) 
  })

  this.store.select(userSlice).subscribe((user)=>{
    this.userId= user.userData?.userId
    
  })

  this.form=this.fb.group({
    Description:[null]
  })

  this.form1=this.fb.group({
    Description:[null]
  })

  }

  addAnswer(){
    this.questionService.addAnswer({...this.form.value, questionId:this.question?.Id, userId:this.userId}).subscribe()
    this.form.reset()
  }  

  // addComment(){
  //   this.questionService.addComment(...this.form1.value, answerId:this.answer?.Id, this.userId).subscribe()
  //   this.form1.reset()
  // }

}
