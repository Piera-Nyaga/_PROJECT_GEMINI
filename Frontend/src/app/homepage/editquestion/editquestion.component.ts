import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loadSingleQuestionId, updatequestion } from 'src/app/States/Actions/questions.action';
import { allQuestions, getOneQuestion } from 'src/app/States/Reducers/question.reducer';
import { addQuestion, Questions } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-editquestion',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent {
  constructor(private fb: FormBuilder, private questionService: QuestionService, private router: Router, private route: ActivatedRoute, private store:Store<AppState>) { }
  form!: FormGroup;
  question?: addQuestion
  questions:Questions[]=[]
  id!: string


  ngOnInit() {
    this.form = this.fb.group({
      Title: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      Code: [null],
      // createdAt: [new Date().toLocaleDateString(), [Validators.required]]
    })
    
    this.route.params.subscribe((param:Params)=>{
      this.id=param['id']
      this.store.dispatch(loadSingleQuestionId({id:param['id']}))
    })
    
    this.store.select(getOneQuestion).subscribe(question=>{
      if(question){
        this.question=question
        this.form.setValue({
          Title: question.Title,
          Description: question.Description,
          Code: question.Code
        })
      }
    })

    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id']
    //   this.questionService.getOneQuiz(params['id']).subscribe((question) => {
    //     this.question = question
    //     this.form.patchValue({
    //       Title: question.Title,
    //       Description: question.Description,
    //       Code: question.Code
    //     })
    //     console.log(question);

    //   })
    //   if (this.question) {
    //     console.log(this.questionService.getQuiz());
    //   }

    // })
  }

  updateQuiz() {
    this.store.dispatch(updatequestion({id:this.id, updatedQuestion:this.form.value}))
    this.store.select(allQuestions).subscribe((questions)=>
    this.questions=questions)
    this.router.navigate(['/home/myquestions'])

    // let question:Questions={...this.question, ...this.form.value}
    // this.questionService.updateQuiz(this.question!.Id, question)
    // this.router.navigate(['../../'],{relativeTo:this.route})

  }


}
