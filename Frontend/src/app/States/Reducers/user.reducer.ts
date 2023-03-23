import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AdminUser, LoginSuccess, User } from "../../Interfaces/user";
import * as UserActions from '../Actions/user.action'

export interface UserInterface{
    userData:LoginSuccess|null
    users:User[]
    userAdmin:AdminUser[]
    errorMessage:string
    registerSuccessMessage?:string
    registerFailureMessage?:string
    successonDelete: string
    erroronDelete: string
}

const initialState:UserInterface={
    userData:null,
    users:[],
    userAdmin:[],
    errorMessage:'',
    registerSuccessMessage:'',
    registerFailureMessage:'',
    successonDelete: '',
    erroronDelete: ''

}

export const userSlice=createFeatureSelector<UserInterface>('user')

export const allUsers= createSelector(userSlice, state=>state.userAdmin)

export const userReducer= createReducer<UserInterface>(
    initialState,

    // REGISTER
    on(UserActions.registerSuccess, (state,actions):UserInterface=>{
        return{
            ...state,
            registerSuccessMessage: actions.res.message,
            registerFailureMessage:''
            
        }
    }),
    on(UserActions.registerFailure, (state,actions):UserInterface=>{
        return{
            ...state,
            registerSuccessMessage:'',
            registerFailureMessage: actions.errorMessage
            
        }
    }),

    // LOGIN
    on(UserActions.loginSuccess, (state,actions):UserInterface=>{
        return{
            ...state,
            errorMessage:'',
            userData:actions.res
        }
    }),
    on(UserActions.loginFailure, (state,actions):UserInterface=>{
        return{
            ...state,
            errorMessage:actions.errorMessage,
            userData:null
        }
    }),

    // GET ALL USERS
    on(UserActions.getUsersSuccess, (state,actions):UserInterface=>{
        return{
            ...state,
            errorMessage:'',
            userAdmin:actions.users
        }
    }),
    on(UserActions.getUsersFailure, (state,actions):UserInterface=>{
        return{
            ...state,
            errorMessage:actions.errorMessage,
            userAdmin:[]
        }
    }),
    // DELETE
    on(UserActions.deleteUserSuccess, (state,action):UserInterface=>{

        return {
         ...state,
         successonDelete:action.message.message,
         erroronDelete:''
         
          
        } 
     }),
     on(UserActions.deleteUserFailure, (state,action):UserInterface=>{

        return {
         ...state,
         erroronDelete:action.errorMessage,
         successonDelete:''
          
        } 
     })
    
)