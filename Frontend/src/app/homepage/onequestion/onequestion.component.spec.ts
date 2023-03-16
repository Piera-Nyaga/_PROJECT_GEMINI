import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnequestionComponent } from './onequestion.component';

describe('OnequestionComponent', () => {
  let component: OnequestionComponent;
  let fixture: ComponentFixture<OnequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OnequestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
