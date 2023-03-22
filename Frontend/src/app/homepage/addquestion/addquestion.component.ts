import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { addQuestion } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addquestion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  constructor(private fb:FormBuilder, private questionService:QuestionService,private router:Router, private route:ActivatedRoute){}
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
    this.questionService.addQuiz(this.form.value).subscribe()
    // console.log(this.form.value);
    
    this.form.reset()
    this.router.navigate(['/home'])

    
  }

}
