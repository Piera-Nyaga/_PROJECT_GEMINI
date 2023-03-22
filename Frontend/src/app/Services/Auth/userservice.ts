import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User,Message,LoginUser,LoginSuccess} from '../../Interfaces/user'
import{Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }

  registerUser(user:User):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/users/register',user)
  }

  loginUser(user:LoginUser):Observable<LoginSuccess>{
    return this.http.post<LoginSuccess>('http://localhost:4000/users/login',user)
  }

}