import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../Interfaces/question';
import { QuestionService } from '../../Services/QuestionsService/questionservice';

@Component({
  selector: 'app-addquestion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  constructor(private fb:FormBuilder, private questionService:QuestionService){}
  form!: FormGroup;


  ngOnInit(){
    this.form= this.fb.group({
      title:[null, [Validators.required]],
      description:[null, [Validators.required]],   
      code:[null, [Validators.required]],
      createdAt: [new Date().toLocaleDateString(), [Validators.required]]
    })
  }

  addQuiz(){
    let question:Question={ id: Math.floor(Math.random() * 1000000).toString(), ...this.form.value }
    this.questionService.addQuiz(question)

    this.form.reset()
  }

}
