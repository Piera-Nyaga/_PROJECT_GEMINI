import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthService } from './Services/Auth/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'THE GATEWAY';

  constructor(public auth:AuthService,private store:Store<AppState>){}
}
