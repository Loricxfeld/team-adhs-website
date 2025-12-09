import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermineComponent } from './admin-termine.component';

describe('AdminTermineComponent', () => {
  let component: AdminTermineComponent;
  let fixture: ComponentFixture<AdminTermineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTermineComponent]
    });
    fixture = TestBed.createComponent(AdminTermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
