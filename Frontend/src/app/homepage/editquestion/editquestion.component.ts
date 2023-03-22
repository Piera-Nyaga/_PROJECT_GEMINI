import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
  constructor(private fb:FormBuilder, private questionService:QuestionService, private router:Router, private route:ActivatedRoute){}
  form!: FormGroup;
  question?:addQuestion
  id!:string


  ngOnInit(){
    this.form= this.fb.group({
      Title:[null, [Validators.required]],
      Description:[null, [Validators.required]],   
      Code:[null],
      // createdAt: [new Date().toLocaleDateString(), [Validators.required]]
    })

    this.route.params.subscribe((params:Params)=>{
      this.questionService.getOneQuiz(params['id']).subscribe((question)=>
        this.question=question
      )


    if (this.question) {
      this.form.patchValue({
        title:this.question.Title,
        description:this.question.Description,
        code:this.question.Code
      })

    console.log(this.questionService.getQuiz());
  }
       
    }) 
  }

  updateQuiz(){
    this.questionService.updateQuiz(this.id, this.form.value).subscribe()
    this.router.navigate(['/home'])
    

    // let question:Questions={...this.question, ...this.form.value}
    // this.questionService.updateQuiz(this.question!.Id, question)
    // this.router.navigate(['../../'],{relativeTo:this.route})

  }


}
