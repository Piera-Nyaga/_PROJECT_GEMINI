import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PROJECT_X';

  constructor(private store:Store<AppState>){}
}
