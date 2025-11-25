import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngehoerigeComponent } from './angehoerige.component';

describe('AngehoerigeComponent', () => {
  let component: AngehoerigeComponent;
  let fixture: ComponentFixture<AngehoerigeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngehoerigeComponent]
    });
    fixture = TestBed.createComponent(AngehoerigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
