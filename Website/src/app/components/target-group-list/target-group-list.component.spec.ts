import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetGroupListComponent } from './target-group-list.component';

describe('TargetGroupListComponent', () => {
  let component: TargetGroupListComponent;
  let fixture: ComponentFixture<TargetGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetGroupListComponent]
    });
    fixture = TestBed.createComponent(TargetGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
