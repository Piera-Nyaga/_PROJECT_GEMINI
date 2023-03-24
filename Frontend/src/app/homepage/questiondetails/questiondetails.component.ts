import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { deletequestion, loadSingleQuestion, loadSingleQuestionId } from 'src/app/States/Actions/questions.action';
import { allQuestions, getOneQuestion, getSingleQuestion, myQuestions } from 'src/app/States/Reducers/question.reducer';
// import { getSingleQuestion } from 'src/app/States/Reducers/question.reducer';
import { Answer, Questions, Vote, Comment } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-questiondetails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent {
  id!:string
  question!:Questions
  questions:Questions[]=[]
  answers:Answer[]=[]
  comments:Comment[]=[]
  votes!:Vote[]
  countAns!:Answer[]
  
  

 constructor(private route:ActivatedRoute, private questionService:QuestionService,private router:Router, private store:Store<AppState>){}
 
  shqQuiz=false;
  shAnsw = false;
  shComm = false;
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
        let x=JSON.parse(question.Answers)
        this.answers=x
        this.countAns=x
      }
    })
  //   this.route.params.subscribe((params:Params)=>{
  //     this.id=params['id']
  //     this.questionService.getOneQuiz(params['id']).subscribe((question)=>{
  //       if (question) {
  //       this.question=question
  //       const userJson = localStorage.getItem('currentUser');
  //       this.currentUser = userJson !== null ? JSON.parse(question.answers) : this.Answers;
  //       this.Answers=JSON.parse(question.answers) 
        
  //       }
  //     }  
  //     ) 
  // })
     
  }

  Update(){
    this.router.navigate([`../../edit/${this.id}`],{relativeTo:this.route})
    }

  Delete(){
    this.store.dispatch(deletequestion({id:this.id}))
    this.store.select(myQuestions).subscribe((questions)=>
    this.questions=questions)
    this.router.navigate(['/home/myquestions'])
      // this.questionService.deleteQuiz(this.id).subscribe()
      // this.router.navigate(['../../'],{relativeTo:this.route})

  }
}
