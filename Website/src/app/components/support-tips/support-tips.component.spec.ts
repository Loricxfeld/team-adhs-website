import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTipsComponent } from './support-tips.component';

describe('SupportTipsComponent', () => {
  let component: SupportTipsComponent;
  let fixture: ComponentFixture<SupportTipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportTipsComponent]
    });
    fixture = TestBed.createComponent(SupportTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
