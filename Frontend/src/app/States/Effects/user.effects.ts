import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, of,map, tap } from "rxjs";
import { AuthService } from "src/app/Services/Auth/authservice";
import { UserService } from "src/app/Services/Auth/userservice";
import { AdminService } from "../../admin/adminService";

import * as LoginActions from '../Actions/user.action'

@Injectable()
export class UserEffects{
    constructor(private action:Actions ,private userService:UserService, private adminService:AdminService, private auth:AuthService){}

    

    register= createEffect(()=>{
        return this.action.pipe(
            ofType(LoginActions.register),
            exhaustMap(action=>{
                return this.userService.registerUser(action.user).pipe(
                 map(res=>LoginActions.registerSuccess({res})),
                 catchError(error=>of(LoginActions.registerFailure({errorMessage:error.message})))
                )
            })
        )
    })

    

    login= createEffect(()=>{
        return this.action.pipe(
            ofType(LoginActions.login),

            exhaustMap(action=>{
                return this.userService.loginUser(action.user).pipe(
                 map(res=>{ 
                    this.auth.login()
                    
                    
                    localStorage.setItem('token', res.token)
                    return LoginActions.loginSuccess({res})}),

                 catchError(error=>of(LoginActions.loginFailure({errorMessage:error.message})))
                )
            })
        )
    })

    getUsers=createEffect(()=>{
        return this.action.pipe(
            ofType(LoginActions.getUsers),
            exhaustMap(()=>{
               return this.adminService.getUsers().pipe(
                    map(users=>{
                        return LoginActions.getUsersSuccess({users})
                    }),
                    catchError(error=>of(LoginActions.getUsersFailure({errorMessage:error.message})))
                )
            })
        )
    })
    deleteUser= createEffect(()=>{
        return this.action.pipe(
            ofType(LoginActions.deleteUser),
            
            exhaustMap(action=>{
               return this.adminService.deleteUser(action.id).pipe(
                    map(successResponse=>{
                        
                    return  LoginActions.deleteUserSuccess({message:successResponse})
                    }),
                    catchError(error=>of(LoginActions.deleteUserFailure({errorMessage:error.message})))
                ) 
            }) 
        )
    })
    
}