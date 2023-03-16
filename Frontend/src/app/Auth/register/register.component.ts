import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { Router } from '@angular/router';
import { UserService } from '../../Services/Auth/userservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user: User ={ Username:'', Email:'', Password:'', ConfirmPassword:'' };
  error = '';
  form!: FormGroup

  constructor(private router: Router, private fb:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  submitData(): void {
    this.userService.register(this.form.value)
    this.router.navigate(['/login'])
  }



}
