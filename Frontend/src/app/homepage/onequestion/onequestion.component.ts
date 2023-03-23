import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Questions, Answer, Comment } from '../../Interfaces/question';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userSlice } from "../../States/Reducers/user.reducer";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loadQuestions, loadSingleQuestion, loadSingleQuestionId } from 'src/app/States/Actions/questions.action';
import { allQuestions, fullquestion, getOneQuestion, getSingleQuestion } from 'src/app/States/Reducers/question.reducer';


@Component({
  selector: 'app-onequestion',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './onequestion.component.html',
  styleUrls: ['./onequestion.component.css']
})

export class OnequestionComponent implements OnInit{
 question?:Questions;
 answers!:Answer[]
 comments!:Comment[]
 id!:string
 userId:string=''

 constructor(private route:ActivatedRoute, private questionService:QuestionService,private router:Router, private fb:FormBuilder, private store:Store<AppState>){}
 form!: FormGroup;
 form1!:FormGroup;
 shqQuiz=false;
 shAnsw = false;
 shComm=false;

  ShowQuestion(){
    this.shqQuiz=!this.shqQuiz
  }

  showAnswer(){
    this.shAnsw=!this.shAnsw
  }
  showComment(){
    this.shComm=!this.shComm
  }

  ngOnInit(): void {
    this.route.params.subscribe((param:Params)=>{
      this.id=param['id']
      this.store.dispatch(loadSingleQuestionId({id:param['id']}))
      this.store.dispatch(loadSingleQuestion({id:param['id']}))
    })
    
    this.store.select(getSingleQuestion).subscribe(question=>{
    if(question){
      this.question=question
      console.log(question);
      let x=JSON.parse(question.Answers)
      this.answers=x
    }
    })
    this.store.select(userSlice).subscribe((user)=>{
    this.userId= user.userData?.userId
    console.log(this.userId); 
    console.log(this.question);
    
  })

  this.form=this.fb.group({
    Description:[null]
  })

  this.form1=this.fb.group({
    Description:[null]
  })

  }

  addAnswer(){
    this.questionService.addAnswer({...this.form.value, questionId:this.question?.Id}).subscribe(answer=>{
    console.log(answer);
    })
    this.form.reset()
    this.store.dispatch(loadQuestions())
  }  

  // addComment(){
  //   this.questionService.addComment(...this.form1.value, answerId:this.answer?.Id, this.userId).subscribe()
  //   this.form1.reset()
  // }

}
