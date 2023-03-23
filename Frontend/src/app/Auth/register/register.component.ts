import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/Auth/userservice';
import { register } from 'src/app/States/Actions/user.action';
import { AppState } from '../../../app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user: User ={ UserName:'', Email:'', Password:'', ConfirmPassword:'' };
  error = '';
  form!: FormGroup

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      UserName: [null, [Validators.required]],
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required]],
      ConfirmPassword: [null, [Validators.required]]
    })
  }

  submitData(): void {
    // if (this.form.invalid) {
    //   return
    // }
    this.store.dispatch(register({user:this.form.value}))
    // this.userService.registerUser(this.form.value).subscribe()
      this.router.navigate(['/login'])
  }

  }


  


