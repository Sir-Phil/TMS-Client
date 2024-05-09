import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerIconRendererComponent } from './tabler-icon-renderer.component';

describe('TablerIconRendererComponent', () => {
  let component: TablerIconRendererComponent;
  let fixture: ComponentFixture<TablerIconRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablerIconRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablerIconRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
