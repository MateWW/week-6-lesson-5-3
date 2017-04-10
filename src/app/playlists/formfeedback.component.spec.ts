import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfeedbackComponent } from './formfeedback.component';

describe('FormfeedbackComponent', () => {
  let component: FormfeedbackComponent;
  let fixture: ComponentFixture<FormfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
