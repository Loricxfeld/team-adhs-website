import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembersListComponent } from './admin-members-list.component';

describe('AdminMembersListComponent', () => {
  let component: AdminMembersListComponent;
  let fixture: ComponentFixture<AdminMembersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMembersListComponent]
    });
    fixture = TestBed.createComponent(AdminMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
