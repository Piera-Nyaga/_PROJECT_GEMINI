import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Question } from '../../Interfaces/question';
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
  question?:Question


  ngOnInit(){
    this.form= this.fb.group({
      title:[null, [Validators.required]],
      description:[null, [Validators.required]],   
      code:[null],
      createdAt: [new Date().toLocaleDateString(), [Validators.required]]
    })

    this.route.params.subscribe((params:Params)=>{

      this.question= this.questionService.getOneQuiz(params['id'])
    if (this.question) {
      this.form.patchValue({
        title:this.question.title,
        description:this.question.description,
        code:this.question.code
      })

    console.log(this.questionService.getQuiz());
  }
       
    }) 
  }

  updateQuiz(){
    let question:Question={...this.question, ...this.form.value}
    this.questionService.updateQuiz(this.question!.id, question)
    this.router.navigate(['../../'],{relativeTo:this.route})

  }


}
