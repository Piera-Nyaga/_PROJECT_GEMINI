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
    // token(arg0: string, token: any): unknown
    message:string
}
export interface LoginSuccess{
    userId?: any
    UserName:string
    Role:string
    message:string
    token:string   
}