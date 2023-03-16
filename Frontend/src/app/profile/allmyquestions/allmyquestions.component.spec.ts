import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmyquestionsComponent } from './allmyquestions.component';

describe('AllmyquestionsComponent', () => {
  let component: AllmyquestionsComponent;
  let fixture: ComponentFixture<AllmyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AllmyquestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllmyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
