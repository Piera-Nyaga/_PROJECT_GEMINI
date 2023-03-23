import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Questions } from 'src/app/Interfaces/question';
import { AdminService } from '../adminService';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { deletequestion, loadQuestions } from 'src/app/States/Actions/questions.action';
import { allQuestions } from 'src/app/States/Reducers/question.reducer';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questions: Questions[] = []
  id!: string

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }


  ngOnInit(): void {
  this.store.dispatch(loadQuestions())
  this.store.select(allQuestions).subscribe((questions)=>
  this.questions=questions)
  }

  DeleteQuiz(id: string) {
    this.store.dispatch(deletequestion({ id }))
    this.router.navigate(['/admin/questions'])
  }
}

