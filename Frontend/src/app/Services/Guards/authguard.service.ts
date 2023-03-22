import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs'
import {AuthService} from '../Auth/authservice'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private AuthService:AuthService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return this.AuthService.getAuthStatus().then((status:boolean)=>{
    
    if(status){
              return true
            }
    if (localStorage.getItem('access_token')) {
        return true;
      }
  
      this.router.navigate(['login']);
      return false;
    }

//     if(status){
//       return true
//     }else{
//       this.router.navigate(['login'])
//       return false
//     }
//    }
  )}
}

