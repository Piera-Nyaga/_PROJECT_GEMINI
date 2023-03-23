import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../adminService';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUser, User } from 'src/app/Interfaces/user';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { deleteUser, getUsers } from 'src/app/States/Actions/user.action';
import { allUsers } from "../../States/Reducers/user.reducer";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$!:Observable<AdminUser[]>
  // id:string=''

constructor(private adminService:AdminService, private router:Router, private route:ActivatedRoute, private store:Store<AppState>){}


ngOnInit(): void {
  this.store.dispatch(getUsers())
  this.users$=this.store.select(allUsers)
  
  
}
DeleteUser(id:string){
  this.store.dispatch(deleteUser({id}))
  this.router.navigate(['/admin/users'])
}
}

