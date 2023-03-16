import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrecentComponent } from './mostrecent.component';

describe('MostrecentComponent', () => {
  let component: MostrecentComponent;
  let fixture: ComponentFixture<MostrecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MostrecentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
