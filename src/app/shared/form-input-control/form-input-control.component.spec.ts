import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputControlComponent } from './form-input-control.component';

describe('FormInputControlComponent', () => {
  let component: FormInputControlComponent;
  let fixture: ComponentFixture<FormInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
