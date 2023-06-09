import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { login } from 'src/app/States/Actions/user.action';
import { UserService } from 'src/app/Services/Auth/userservice';
import { AuthService } from 'src/app/Services/Auth/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form!:FormGroup
  constructor(private fb:FormBuilder,private userService:UserService,  private auth:AuthService, private router:Router, private store:Store<AppState>){}

  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
  }

  submitData(): void {
    // if (this.form.invalid) {
    //   return
    // }
    this.store.dispatch(login({user:this.form.value}))
    this.userService.loginUser(this.form.value).subscribe(response=>{
     
      this.auth.setRole(response.Role)
      console.log(response);
      
      this.auth.login()
      // localStorage.setItem('token', response.Role)

      if(response.Role == 'user'){
       
        this.router.navigate(['/home'])
        // console.log(response.Name)
      }
      else if(response.Role == 'admin'){
        this.router.navigate(['/admin'])
      }
  })
}
}
