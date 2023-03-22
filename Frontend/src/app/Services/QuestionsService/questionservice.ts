import { Injectable } from '@angular/core';
import { addAnswer, addComment, addQuestion, Questions, Vote} from '../../Interfaces/question';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs'
import { Message } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
//   private question: Question[] = [
    
//     { 
//         id:'12',
//         title:"Error print user.default swift 3",
//         description:"I have three screens the first of login and the second shows the user information. On the login screen keep the user_id value in user.defaults and when I go to the second screen I use that value to",
//         code:"I have two screens the first of login and the second shows the user information. On the login screen keep the user_id value in user.defaults and when I go to the second screen I use that value to ...",
//         createdAt: new Date().toLocaleDateString()
//     },
// ]



  constructor(private http:HttpClient) { }
  questions: Questions[]= []


  addQuiz(question:addQuestion):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/questions/post',question)
  }

  getQuiz():Observable<Questions[]> {
      return this.http.get<Questions[]>('http://localhost:4000/questions/allquestions')
  }

  getOneQuiz(id:string):Observable<Questions>{
    return this.http.get<Questions>(`http://localhost:4000/questions/questions/${id}`)
  }

  getmyQuiz(userId:string):Observable<Questions[]>{
    return this.http.get<Questions[]>(`http://localhost:4000/questions/myquestions/${userId}`)
  }
  
  updateQuiz(id:string, updatedquestion:addQuestion){
    return this.http.patch<addQuestion>(`http://localhost:4000/questions/update/${id}`,updatedquestion)
  }

  addAnswer(answer:addAnswer):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/answers/post',answer)
  }

  addComment(comment:addComment):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/comments/post',comment)
  }
  addVote(vote:Vote):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/votes/add',vote)
  }

}