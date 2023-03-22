import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

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

  