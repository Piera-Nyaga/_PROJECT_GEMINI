import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { addQuestion, Questions } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { addquestion, loadQuestions } from 'src/app/States/Actions/questions.action';
import { Store } from '@ngrx/store';
import { allQuestions } from 'src/app/States/Reducers/question.reducer';

@Component({
  selector: 'app-addquestion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  questions!:Questions[];
  constructor(private fb:FormBuilder, private questionService:QuestionService,private router:Router, private route:ActivatedRoute, private store:Store<AppState>){}
  form!: FormGroup;


  ngOnInit(){
    this.form= this.fb.group({
      Title:[null, [Validators.required]],
      Description:[null, [Validators.required]],   
      Code:[null],
      // createdAt: [new Date().toLocaleDateString(), [Validators.required]]
    })
  }

  submitData(){
    this.store.dispatch(addquestion({addedQuestion:this.form.value}))
    this.store.select(allQuestions).subscribe((questions)=>
    this.questions=questions)
    this.router.navigate(['/home'])

    // this.questionService.addQuiz(this.form.value).subscribe()
    // this.form.reset()
    // this.store.dispatch(loadQuestions()) 
    // this.router.navigate(['/home/myquestions'])

    
  }

}
