import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/Auth/userservice';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public userService:UserService){}

}
