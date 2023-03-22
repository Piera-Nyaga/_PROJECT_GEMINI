export interface User {
    Id?: string
    Username:string
    Email:string
    Password:string
    ConfirmPassword:string
}
export interface LoginUser{
    Email:string
    Password:string
}
export interface Message{
    message:string
}
export interface LoginSuccess{
    UserName:string
    Role:string
    message:string
    token:string   
}