import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostansweredComponent } from './mostanswered.component';

describe('MostansweredComponent', () => {
  let component: MostansweredComponent;
  let fixture: ComponentFixture<MostansweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MostansweredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostansweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
