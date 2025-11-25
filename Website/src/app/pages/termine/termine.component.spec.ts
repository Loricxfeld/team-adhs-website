import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermineComponent } from './termine.component';

describe('TermineComponent', () => {
  let component: TermineComponent;
  let fixture: ComponentFixture<TermineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermineComponent]
    });
    fixture = TestBed.createComponent(TermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
