import { Injectable } from '@angular/core';
import { Questions } from '../Interfaces/question';
import { AdminUser, User } from '../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Message } from 'src/app/Interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }
    questions: Questions[] = []
    users: AdminUser[] = []


    getQuiz(): Observable<Questions[]> {
        return this.http.get<Questions[]>('http://localhost:4000/questions/allquestions')
    }

    deleteQuiz(id: string): Observable<Message> {
        return this.http.delete<Message>(`http://localhost:4000/questions/delete/${id}`)
    }
    getUsers(): Observable<AdminUser[]> {
        return this.http.get<AdminUser[]>('http://localhost:4000/users/allusers')
    }
    deleteUser(id: string): Observable<Message> {
        return this.http.delete<Message>(`http://localhost:4000/users/delete/${id}`)
    }


}