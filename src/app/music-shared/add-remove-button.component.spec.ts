import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveButtonComponent } from './add-remove-button.component';

describe('AddRemoveButtonComponent', () => {
  let component: AddRemoveButtonComponent;
  let fixture: ComponentFixture<AddRemoveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
