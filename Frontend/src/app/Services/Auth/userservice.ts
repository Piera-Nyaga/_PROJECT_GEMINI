import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User[]=[]

  constructor(private router:Router) { }

  register(user: User): void {
    this.user.push(user);
    console.log(this.user);
  }

  isLoggedIn=false
  

  getAuthStatus():Promise<boolean>{
    const promise = new Promise<boolean>((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.isLoggedIn)
    },10)
    })
    return promise;
  }

  login(){
    this.isLoggedIn=true;
    this.router.navigate(['/home'])

  }

  logout(){
    this.isLoggedIn=false;
  }

}

  