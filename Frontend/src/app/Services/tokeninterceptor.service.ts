import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req:HttpRequest<any> , next:HttpHandler){

    if(req.url!=='http://localhost:4000/users/login')
    {
      const token = localStorage.getItem('token') as string
      
    let modifiedReq= req.clone({headers:new HttpHeaders().append('authorization', `Bearer ${token}`)})
    
    return next.handle(modifiedReq)
    }
    return next.handle(req)
  }
}