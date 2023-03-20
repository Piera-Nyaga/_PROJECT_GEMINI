export class User{
    constructor(
      public Id:string, public UserName:string , 
        public Email:string, public Password:string, public Role:string){}
}


export interface DecodedData{
  Id: string,
  UserName:string,
  Email:string,
  Role: string,
  iat: number
  exp: number
}


export class Question{
  constructor(
    public Id:string, public Title:string , 
      public Description:string, public Code:string, 
      public createdAt:string, public userId?:string){}
}