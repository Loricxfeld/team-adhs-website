import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInfoCardComponent } from './group-info-card.component';

describe('GroupInfoCardComponent', () => {
  let component: GroupInfoCardComponent;
  let fixture: ComponentFixture<GroupInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupInfoCardComponent]
    });
    fixture = TestBed.createComponent(GroupInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
