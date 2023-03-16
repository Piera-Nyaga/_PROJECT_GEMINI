import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./landing-page/landing-page.component').then(c => c.LandingPageComponent) },
  { path: 'register', loadComponent: () => import('./Auth/register/register.component').then(c => c.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./Auth/login/login.component').then(c => c.LoginComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
  children: [
    { path: '', loadComponent: () => import('./profile/allmyquestions/allmyquestions.component').then(c => c.AllmyquestionsComponent)},
    { path: 'mostanswered', loadComponent: () => import('./profile/mostanswered/mostanswered.component').then(c => c.MostansweredComponent)},
    { path: 'mostrecent', loadComponent: () => import('./profile/mostrecent/mostrecent.component').then(c => c.MostrecentComponent)},
  ]
},

  {path: 'home', loadComponent: () => import('./homepage/homepage.component').then(c => c.HomepageComponent),
    children: [
      { path: '', loadComponent: () => import('./homepage/allquestions/allquestions.component').then(c => c.AllquestionsComponent)},
      { path: 'myquestions', loadComponent: () => import('./homepage/myquestions/myquestions.component').then(c => c.MyquestionsComponent)},
      { path: 'add', loadComponent: () => import('./homepage/addquestion/addquestion.component').then(c => c.AddquestionComponent)},
      { path: 'one/:id', loadComponent: () => import('./homepage/onequestion/onequestion.component').then(c => c.OnequestionComponent)},
      { path: 'onee/:id', loadComponent: () => import('./homepage/questiondetails/questiondetails.component').then(c => c.QuestiondetailsComponent)},
      { path: 'edit/:id', loadComponent: () => import('./homepage/editquestion/editquestion.component').then(c => c.EditquestionComponent)},
    ]
  },

  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
  children: [
    { path: '', loadComponent: () => import('./admin/users/users.component').then(c=>c.UsersComponent)},
    { path: 'questions', loadComponent: () => import('./admin/questions/questions.component').then(c => c.QuestionsComponent)},
    // { path: 'questions', loadComponent: () => import('./profile/mostrecent/mostrecent.component').then(c => c.MostrecentComponent)},
  ]
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
