import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { QuestiondetailsComponent } from './homepage/questiondetails/questiondetails.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEffects } from './States/Effects/user.effects';
import { userReducer } from './States/Reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    QuestiondetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({user:userReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
