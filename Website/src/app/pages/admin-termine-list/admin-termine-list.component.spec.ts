import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermineListComponent } from './admin-termine-list.component';

describe('AdminTermineListComponent', () => {
  let component: AdminTermineListComponent;
  let fixture: ComponentFixture<AdminTermineListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTermineListComponent]
    });
    fixture = TestBed.createComponent(AdminTermineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
