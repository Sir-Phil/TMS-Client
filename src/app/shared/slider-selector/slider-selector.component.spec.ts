import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSelectorComponent } from './slider-selector.component';

describe('SliderSelectorComponent', () => {
  let component: SliderSelectorComponent;
  let fixture: ComponentFixture<SliderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
