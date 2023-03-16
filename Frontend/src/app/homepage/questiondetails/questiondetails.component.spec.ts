import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiondetailsComponent } from './questiondetails.component';

describe('QuestiondetailsComponent', () => {
  let component: QuestiondetailsComponent;
  let fixture: ComponentFixture<QuestiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestiondetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
