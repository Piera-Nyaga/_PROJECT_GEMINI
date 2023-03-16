import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { OnequestionComponent } from './onequestion/onequestion.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EditquestionComponent } from './homepage/editquestion/editquestion.component';
import { QuestiondetailsComponent } from './homepage/questiondetails/questiondetails.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestiondetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
